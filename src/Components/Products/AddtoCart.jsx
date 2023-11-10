import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Card, CardContent, CardMedia, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { toast } from 'react-toastify';
import { useCart } from '../Context/ProductCart';
import { useAuth } from '../Context/Authentication';
import { baseURL, fetchpayment } from '../../ApiManager/AxiosManage';
import DropIn from 'braintree-web-drop-in-react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { cartstyles } from '../Additional/Style';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { Link } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import Swal from 'sweetalert2';



const AddToCart = () => {
    const [auth] = useAuth()
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const userAuthToken = auth?.user?._id;
    const [loading, setLoading] = useState(false);
    const [showPaymentSection, setShowPaymentSection] = useState(false);
    const [showCheckoutButton, setShowCheckoutButton] = useState(true);

    // Filter user-specific products
    const userProducts = cart?.products.filter((item) => item.authToken === userAuthToken);
    const removeFromCart = (index) => {
        const updatedProducts = [...userProducts];
        updatedProducts.splice(index, 1);
        Swal.fire({
            icon: 'success',
            title: 'Product Remove From Your Cart',
            text: 'Please Go to the Cart',
            timer: 1000,
            showConfirmButton: false,
          })
        // toast.warn("Product Removed From Cart")
        const updatedCart = {
            ...cart,
            products: [
                ...cart.products.filter((item) => item.authToken !== userAuthToken),
                ...updatedProducts,
            ],
        };
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Update Product Quantity on cart page
    const updateQuantity = (index, newQuantity) => {
        const updatedProducts = [...userProducts];
        updatedProducts[index].purchaseQuantity = newQuantity;
        toast.info(`Quantity updated for ${updatedProducts[index].name}`);
        setCart({
            ...cart,
            products: updatedProducts,
        });
        localStorage.setItem("cart", JSON.stringify({ products: updatedProducts }));
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        for (const item of userProducts) {
            totalPrice += item.price * item.purchaseQuantity;
        }
        return totalPrice;
    };

    // Payment Processing
    const getToken = async () => {
        try {
            const { data } = await fetchpayment();
            setClientToken(data?.clientToken);
            setLoading(true)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getToken();
    }, [auth?.token]);

    //handle payments
    const handlePayment = async () => {
        setShowPaymentSection(true);
        setShowCheckoutButton(false);
    };
    const nownowpayment = async () => {
        setShowPaymentSection(false)
        setShowCheckoutButton(true);
    }
    console.log(clientToken);
    return (
        <Layout title={"Cart Page"}>
            <Typography gutterBottom variant="h3" align="center" style={{ marginTop: 10, fontFamily: "Times", fontWeight: "800" }}>
                User Cart Page ({userProducts?.length})
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={8} md={8} lg={8} style={{ background: "", height: "auto" }}>

                    {/* Cart Secction Start */}
                    <Box style={{ background: "#F3F6F7", width: "98%", margin: "0 auto", marginTop: "15px", padding: "20px", borderRadius: "20px" }}>
                        <TableContainer style={{ background: "#F4F5EE", borderRadius: "20px" }}>
                            <Table aria-label="simple table">
                                <TableHead style={{ background: "#B386F5", color: "white" }}>
                                    <TableRow>
                                        <TableCell style={{ color: "black", fontFamily: "Times", fontSize: "20px", fontWeight: "800" }}>Image</TableCell>
                                        <TableCell style={{ color: "black", fontFamily: "Times", fontSize: "20px", fontWeight: "800" }}>Product</TableCell>
                                        <TableCell align="center" style={{ color: "black", fontFamily: "Times", fontSize: "20px", fontWeight: "800" }}>Price</TableCell>
                                        <TableCell align="center" style={{ color: "black", fontFamily: "Times", fontSize: "20px", fontWeight: "800" }}>Quantity</TableCell>
                                        <TableCell align="center" style={{ color: "black", fontFamily: "Times", fontSize: "20px", fontWeight: "800" }}>Total Cost</TableCell>
                                        <TableCell align="center" style={{ color: "black", fontFamily: "Times", fontSize: "20px", fontWeight: "800" }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userProducts.length > 0 ? (
                                        userProducts.map((item, index) => (
                                            <TableRow key={index} style={{ "&:hover": { backgroundColor: "#ECECEC" }, cursor: "pointer" }}>
                                                <TableCell component="th" scope="row">
                                                    <img src={`${baseURL}/api/product/product-photo/${item._id}`} alt="Image" width="50px" height='50px' style={{ borderRadius: "50%" }} />
                                                </TableCell>
                                                <TableCell style={{ color: "black", fontFamily: "Times", fontWeight: "800" }}>{item.name}</TableCell>
                                                <TableCell align="center" style={{ color: "black", fontFamily: "Times", fontWeight: "800" }}>${item.price}</TableCell>
                                                <TableCell align="center" style={{ color: "black", fontFamily: "Times", fontWeight: "800" }}>
                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                                                        <IconButton
                                                            onClick={() => updateQuantity(index, item.purchaseQuantity - 1)}
                                                            disabled={item.purchaseQuantity <= 1}
                                                        >
                                                            <RemoveIcon />
                                                        </IconButton>
                                                        <Typography variant="body1" style={{ marginLeft: "5px", marginRight: "5px" }}>
                                                            {item.purchaseQuantity}
                                                        </Typography>
                                                        <IconButton onClick={() => updateQuantity(index, item.purchaseQuantity + 1)}>
                                                            <AddIcon />
                                                        </IconButton>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="center" style={{ color: "black", fontFamily: "Times", fontWeight: "800" }}>${item.price * item.purchaseQuantity}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton style={{ color: "red" }} onClick={() => removeFromCart(index)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6}>
                                                <center>
                                                    <h2>No items in the cart</h2>
                                                </center>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Divider />
                        {/* <Grid container justifyContent="space-between" alignItems="center" style={{ background: "linear-gradient(0deg, rgba(197,214,214,1) 0%, rgba(205,200,190,1) 100%)", padding: "10px", borderRadius: "10px", marginTop: "20px" }}>
                            <Typography variant="h5" component="h5">
                                <b>Total Price: ${calculateTotalPrice().toFixed(2)}</b>
                            </Typography>
                            {showCheckoutButton && (
                                <Button variant="contained" color="success" onClick={handlePayment}>
                                    Checkout
                                </Button>
                            )}
                        </Grid> */}


                        {showPaymentSection && userProducts.length > 0 ? (
                            <Box className="mt-2">
                                <center><h4>Chosoe YourPayment Option Here</h4></center>
                                <DropIn
                                    options={{
                                        authorization: clientToken,
                                        paypal: {
                                            flow: "vault",
                                        },
                                    }}
                                    onInstance={(instance) => setInstance(instance)}
                                />
                                <Box style={{ width: "250px", margin: "0 auto", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                                    <Button
                                        variant='contained' color='secondary'
                                        onClick={handlePayment}
                                        disabled={loading || !instance || !auth?.user?.address}
                                    >
                                        {loading ? "Processing ...." : "Buy Now"}
                                    </Button>
                                    <Button onClick={nownowpayment} variant='contained' color='warning'>Later</Button>
                                </Box>
                            </Box>
                        ) : null}
                    </Box>
                    {/* Cart Section End */}

                </Grid>

                {
                    userProducts.length > 0 ? (
                        <>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <Paper style={cartstyles.paper} elevation={3}>
                                    <List>
                                        <ListItem style={cartstyles.listItem}>
                                            <ListItemIcon style={cartstyles.icon}>
                                                <AttachMoneyOutlinedIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Total Cost" style={cartstyles.listItemTextHeader} />
                                            <ListItemText primary={`£${calculateTotalPrice().toFixed(2)}`} style={cartstyles.listItemTextValue} />
                                        </ListItem>
                                        <ListItem style={cartstyles.listItem}>
                                            <ListItemIcon style={cartstyles.icon}>
                                                <PersonIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Name" style={cartstyles.listItemTextHeader} />
                                            <ListItemText primary={auth?.user?.name} style={cartstyles.listItemTextValue} />
                                        </ListItem>
                                        <ListItem style={cartstyles.listItem}>
                                            <ListItemIcon style={cartstyles.icon}>
                                                <EmailIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Email" style={cartstyles.listItemTextHeader} />
                                            <ListItemText primary={auth?.user?.email} style={cartstyles.listItemTextValue} />
                                        </ListItem>
                                        <ListItem style={cartstyles.listItem}>
                                            <ListItemIcon style={cartstyles.icon}>
                                                <PhoneIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Phone" style={cartstyles.listItemTextHeader} />
                                            <ListItemText primary={auth?.user?.phone} style={cartstyles.listItemTextValue} />
                                        </ListItem>
                                        <ListItem style={cartstyles.listItem}>
                                            <ListItemIcon style={cartstyles.icon}>
                                                <HomeIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Address" style={cartstyles.listItemTextHeader} />
                                            <Box style={{ display: "flex", alignItems: "center" }}><ListItemText primary={auth?.user?.address} style={cartstyles.listItemTextValue} />&nbsp;&nbsp;
                                                <Link to='/updateprofile' style={{ textDecoration: "none", color: "lightcoral" }}>
                                                    <BorderColorOutlinedIcon />
                                                </Link>
                                            </Box>
                                        </ListItem>
                                    </List>
                                    <Grid container justifyContent="space-between" alignItems="center" style={{ background: "linear-gradient(0deg, rgba(197,214,214,1) 0%, rgba(205,200,190,1) 100%)", padding: "10px", borderRadius: "10px", marginTop: "20px" }}>
                                        <Typography variant="h5" component="h5">
                                            <b>Total Price: ${calculateTotalPrice().toFixed(2)}</b>
                                        </Typography>
                                        {showCheckoutButton && (
                                            <Button variant="contained" color="success" onClick={handlePayment}>
                                                Checkout
                                            </Button>
                                        )}
                                    </Grid>
                                </Paper>
                            </Grid>
                        </>
                    ) : <>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            <Paper style={cartstyles.paper} elevation={3}>
                                <Grid container justifyContent="space-between" alignItems="center" style={{ background: "linear-gradient(0deg, rgba(197,214,214,1) 0%, rgba(205,200,190,1) 100%)", padding: "10px", borderRadius: "10px", marginTop: "20px" }}>
                                    <Typography variant="h6" component="h5" textAlign={"center"} fontFamily={"Times"}>
                                        Please Add product to your Cart First. to view your Payment Details
                                    </Typography>
                                </Grid>
                            </Paper>
                        </Grid>
                    </>
                }

            </Grid>
        </Layout>
    );
};

export default AddToCart;

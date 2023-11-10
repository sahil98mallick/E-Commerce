import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, IconButton, Modal, Skeleton, Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link, useNavigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import SyncIcon from '@mui/icons-material/Sync';
import { toast } from 'react-toastify';
import { useAuth } from '../Context/Authentication';
import { baseURL, fetchproducts } from '../../ApiManager/AxiosManage';
import ProductSidebar from '../Common/ProductSidebar';
import { useCart } from '../Context/ProductCart';
import Swal from 'sweetalert2';
import Layout from '../../Layout/Layout';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #D1F2EB',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};
const Products = () => {
  const [product, setproduct] = useState([]);
  const [loadmore, setloadmore] = useState(6);
  const [cart, setcart] = useCart();
  const [loading, setloading] = useState(true);
  const [auth] = useAuth();
  const navigate = useNavigate()
  const fetchdetails = async () => {
    const response = await fetchproducts();
    const responed = response.data.products
    setproduct(responed)
    setloading(false)
  }
  useEffect(() => {
    fetchdetails()
  }, [])
  console.log(product);
  const moredetails = () => {
    setloadmore(loadmore + 6)
  }

  // Add To Cart 
  const cardadddetails = (item) => {
    if (auth?.user._id) {
      item.authToken = auth?.user._id;
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || { products: [] };
    const existingProduct = cart.products.find((productInCart) => productInCart._id === item._id && productInCart.authToken === auth?.user._id);
    if (existingProduct) {
      existingProduct.purchaseQuantity++;
      Swal.fire({
        icon: 'warning',
        title: 'This Product Already Added in your Cart',
        text: 'Please Go to the Cart',
        timer: 2000,
        showConfirmButton: false,
      })
      // toast("This Product Already Added in your Cart");
      localStorage.setItem("cart", JSON.stringify(cart));
      setcart((prevCart) => ({
        ...prevCart,
        products: cart.products,
      }));
    } else {
      item.purchaseQuantity = 1
      cart.products.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Product Add to Cart")
      setcart((prevCart) => ({
        ...prevCart,
        products: cart.products,
      }));
    }
  }
  // Pop up Message
  const popupmessage = () => {
    Swal.fire({
      title: 'You are not Authorized....',
      text: 'Plese Login First.',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/login')
      }
    });
  };

  return (
    <Layout title={"Products"}>
      <Box style={{ width: "100%", height: "auto", display: "flex", justifyContent: "space-evenly" }}>
        <Card style={{ width: "360px", height: "auto", background: "#F8F9F9" }} sx={{
          display: { xs: 'none', md: 'block' }, // Hide on small screens, show on medium and larger screens
        }}>
          <ProductSidebar />
        </Card>
        <Card style={{ width: "100%", background: "#F8F9F9", height: "auto" }}>
          <Typography gutterBottom variant="h4" align="center" style={{ marginTop: 10, fontFamily: "Times New Roman" }}>
            All Products
          </Typography>
          <Divider />
          {
            loading ? (
              <>

                <div className="row" style={{ width: "100%" }}>
                  <div className="col-md-4">
                    <Card style={{ width: "100%", height: "350px" }}>
                      <center>
                        <CardContent>
                          {/* Product Image Placeholder */}
                          <Skeleton variant="rectangular" width={210} height={118} />

                          {/* Product Title Placeholder */}
                          <Typography component="div" variant="h5">
                            <Skeleton width={210} />
                          </Typography>

                          {/* Product Description Placeholder */}
                          <Typography variant="body2" color="text.secondary">
                            <Skeleton width={210} />
                            <Skeleton width={210} />
                            <Skeleton width={210} />
                          </Typography>
                        </CardContent>
                      </center>
                    </Card><br />
                  </div>
                  <div className="col-md-4">
                    <Card style={{ width: "100%", height: "350px" }}>
                      <center>
                        <CardContent>
                          {/* Product Image Placeholder */}
                          <Skeleton variant="rectangular" width={210} height={118} />

                          {/* Product Title Placeholder */}
                          <Typography component="div" variant="h5">
                            <Skeleton width={210} />
                          </Typography>

                          {/* Product Description Placeholder */}
                          <Typography variant="body2" color="text.secondary">
                            <Skeleton width={210} />
                            <Skeleton width={210} />
                            <Skeleton width={210} />
                          </Typography>
                        </CardContent>
                      </center>
                    </Card><br />
                  </div>
                  <div className="col-md-4">
                    <Card style={{ width: "100%", height: "350px" }}>
                      <center>
                        <CardContent>
                          {/* Product Image Placeholder */}
                          <Skeleton variant="rectangular" width={210} height={118} />

                          {/* Product Title Placeholder */}
                          <Typography component="div" variant="h5">
                            <Skeleton width={210} />
                          </Typography>

                          {/* Product Description Placeholder */}
                          <Typography variant="body2" color="text.secondary">
                            <Skeleton width={210} />
                            <Skeleton width={210} />
                            <Skeleton width={210} />
                          </Typography>
                        </CardContent>
                      </center>
                    </Card><br />
                  </div>
                  <div className="col-md-4">
                    <Card style={{ width: "100%", height: "350px" }}>
                      <center>
                        <CardContent>
                          {/* Product Image Placeholder */}
                          <Skeleton variant="rectangular" width={210} height={118} />

                          {/* Product Title Placeholder */}
                          <Typography component="div" variant="h5">
                            <Skeleton width={210} />
                          </Typography>

                          {/* Product Description Placeholder */}
                          <Typography variant="body2" color="text.secondary">
                            <Skeleton width={210} />
                            <Skeleton width={210} />
                            <Skeleton width={210} />
                          </Typography>
                        </CardContent>
                      </center>
                    </Card><br />
                  </div>
                  <div className="col-md-4">
                    <Card style={{ width: "100%", height: "350px" }}>
                      <center>
                        <CardContent>
                          {/* Product Image Placeholder */}
                          <Skeleton variant="rectangular" width={210} height={118} />

                          {/* Product Title Placeholder */}
                          <Typography component="div" variant="h5">
                            <Skeleton width={210} />
                          </Typography>

                          {/* Product Description Placeholder */}
                          <Typography variant="body2" color="text.secondary">
                            <Skeleton width={210} />
                            <Skeleton width={210} />
                            <Skeleton width={210} />
                          </Typography>
                        </CardContent>
                      </center>
                    </Card><br />
                  </div>
                  <div className="col-md-4">
                    <Card style={{ width: "100%", height: "350px" }}>
                      <center>
                        <CardContent>
                          {/* Product Image Placeholder */}
                          <Skeleton variant="rectangular" width={210} height={118} />

                          {/* Product Title Placeholder */}
                          <Typography component="div" variant="h5">
                            <Skeleton width={210} />
                          </Typography>

                          {/* Product Description Placeholder */}
                          <Typography variant="body2" color="text.secondary">
                            <Skeleton width={210} />
                            <Skeleton width={210} />
                            <Skeleton width={210} />
                          </Typography>
                        </CardContent>
                      </center>
                    </Card><br />
                  </div>
                </div>
                {/* <center>
                  <div style={{ marginTop: "190px" }}>
                    <ScaleLoader
                      color="#c8d636"
                      height={50}
                    />
                  </div>
                </center> */}
              </>
            ) : (
              <>
                <Box className='container' style={{ marginTop: "10px" }}>
                  <center>
                    <div className="row">
                      {
                        product?.slice(0, loadmore)?.map((item, key) => {
                          return (
                            <>
                              <div className="col-md-4">
                                <Card sx={{
                                  maxWidth: "340px", borderRadius: "10px",
                                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                                }}>
                                  <CardMedia
                                    component="img"
                                    height="194"
                                    image={`${baseURL}/api/product/product-photo/${item._id}`}
                                    alt="Product Image"
                                    style={{ objectFit: "cover" }}
                                  />
                                  <CardContent>
                                    <Typography variant="h5" align='center' fontFamily='Times'>
                                      {item?.name?.slice(0, 20)}
                                    </Typography><Divider />
                                    <Box style={{ display: 'flex', justifyContent: "space-evenly" }}>
                                      <Typography variant="h6">
                                        <b> Price:</b> ${item.price}
                                      </Typography> <Divider orientation="vertical" style={{ background: "black", width: "10px" }} />
                                      <Typography variant="h6">
                                        <b> Disct.(%):</b> {item.discountPercentage}
                                      </Typography>
                                    </Box>
                                    <br />
                                    <Typography variant="body2" color="text.secondary">
                                      <b>Description:</b> {item.description.slice(0, 35)}... <br />
                                    </Typography><Divider /><Divider /><Divider />
                                  </CardContent>
                                  <CardActions style={{ display: 'flex', justifyContent: "space-evenly", background: "#5DADE2" }}>
                                    {
                                      !auth.user ? (
                                        <>
                                          <Link onClick={popupmessage}>
                                            <IconButton aria-label="add to favorites">
                                              <RemoveRedEyeIcon style={{ color: "whitesmoke" }} />
                                            </IconButton>
                                          </Link>
                                        </>
                                      ) : (
                                        <>
                                          <Link to={`/productdetails/${item.slug}`}>
                                            <IconButton aria-label="add to favorites">
                                              <RemoveRedEyeIcon style={{ color: "whitesmoke" }} />
                                            </IconButton>
                                          </Link>
                                        </>
                                      )
                                    }
                                    {
                                      !auth.user ? (
                                        <>
                                          <IconButton aria-label="share" onClick={popupmessage}>
                                            <ShoppingCartIcon style={{ color: "#E8DAEF" }} />
                                          </IconButton>
                                        </>
                                      ) : (
                                        <>
                                          <IconButton aria-label="share" >
                                            <ShoppingCartIcon style={{ color: "#E8DAEF" }} onClick={() => { cardadddetails(item) }} />
                                          </IconButton>
                                        </>
                                      )
                                    }
                                    <Button variant='contained' color='secondary' style={{ borderTopRightRadius: 20, borderBottomLeftRadius: 30 }}>Buy Now</Button>
                                  </CardActions>
                                </Card><Divider /><br />
                              </div>
                            </>
                          )
                        })
                      }
                      {
                        loadmore < product.length && <Button style={{ width: "30px", borderRadius: 50, margin: "0 auto" }} onClick={moredetails}>
                          <SyncIcon /></Button>
                      }
                    </div>
                  </center>
                </Box>
              </>
            )
          }
        </Card>
      </Box>
    </Layout>
  )
}

export default Products
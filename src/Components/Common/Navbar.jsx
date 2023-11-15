import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Badge, Box, Button, Grid, IconButton, InputBase, Menu, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import LoginIcon from '@mui/icons-material/Login';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { useAuth } from '../Context/Authentication';
import { AddCircle, Dashboard, ExitToApp, Person, VpnKey } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useCart } from '../Context/ProductCart';
import { useSearch } from '../Context/GlobalSearch';
import PageviewIcon from '@mui/icons-material/Pageview';
import axios from 'axios';

function Navbar() {
  const [auth, setauth] = useAuth()
  const navigate = useNavigate()
  const theme = useTheme();
  const userAuthToken = auth?.user?._id;
  const [cart, setcart] = useCart();
  const [cartItemCount, setCartItemCount] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl1(null);
  };
  const handleClose2 = () => {
    setAnchorEl(null);
  };
  // logout Function
  const logoutfunction = () => {
    toast.warn("Logout Successfully...")
    setauth({
      ...auth,
      user: null,
      token: ""
    })
    localStorage.removeItem("auth");
    navigate("/login")
  }
  const exitapp = () => {
    logoutfunction();
    handleClose();
    handleClose2()
  }
  // Count Total Items
  useEffect(() => {
    if (cart.products && Array.isArray(cart.products)) {
      const userProducts = cart?.products.filter((item) => item.authToken === userAuthToken);
      if (auth.user) {
        setCartItemCount(userProducts.length);
      } else {
        setCartItemCount(0);
      }
    } else {
      setCartItemCount(0);
    }
  }, [cart, auth.user, userAuthToken]);

  // Search products
  const [values, setValues] = useSearch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`http://localhost:12345/api/product/search/${values.keyword}`);
      setValues({ ...values, results: data });
      navigate("/searchproducts");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <AppBar position="sticky" style={{ background: '#F6FAFA', boxShadow: 'none' }}>
        <Toolbar>
          <Box display="flex" alignItems="center" style={{ width: "200px" }}>
            {isMobile ? (
              <>
                <Link to='/' style={{ textDecoration: "none", color: "black", fontFamily: "Times", }}>
                  <Typography variant="h6" style={{ display: 'flex', justifyContent: "space-around", alignItems: 'center', color: 'black', fontFamily: "Times", }}>
                    <img src="https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Emblem.png" alt="Flipkart" style={{ height: 30, marginRight: 15, color: "black", }} />
                    ShopNest
                  </Typography></Link>
              </>
            ) : (
              <>
                <Link to='/' style={{ textDecoration: "none", color: "black" }}>
                  <Typography variant="h5" style={{ display: 'flex', background: "", justifyContent: "space-around", alignItems: 'center', color: 'black', fontFamily: "Times", fontWeight: "800" }}>
                    <img src="https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Emblem.png" alt="Flipkart" style={{ height: 50, borderRadius: "50%" }} />
                    Shop Nest
                  </Typography>
                </Link>
              </>
            )}
          </Box>
          {isMobile ? (
            <>
              <Box style={{ marginLeft: "50px", marginTop: "0px" }}><SearchIcon style={{ color: "black" }} /></Box>
            </>
          ) : (
            <Box style={{ display: "flex", background: "", justifyContent: "space-between", marginLeft: "35px", width: "80%" }}>
              <Box display="flex" alignItems="center" style={{ background: "#E4F3F7", borderRadius: 5, marginRight: 8, padding: "0px 8px" }}>
                <form onSubmit={handleSubmit}>
                  <SearchIcon style={{ color: '#888' }} />
                  <InputBase
                    placeholder="Search for Products, Brands and More"
                    value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                    style={{
                      padding: '1px 8px',
                      backgroundColor: '#E4F3F7',
                      borderRadius: 4,
                      width: '600px',
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </form>
              </Box>
              <Box style={{ display: 'flex', alignItems: "center", justifyContent: "space-evenly", background: "", width: "40%" }}>
                <Button
                  variant="contained"
                  style={{ margin: '0 8px', backgroundColor: '#F3F6F7', color: 'black' }}
                >
                  <CardGiftcardIcon color='black' />&nbsp;
                  Become a Seller
                </Button>
                <Box style={{ display: "flex", alignItems: "center", justifyContent:"space-evenly" }}>
                  <Link to='products'>
                    <Button style={{ borderRadius: "20px" }} >
                      <Inventory2OutlinedIcon style={{ color: '#F2A20D' }} />
                    </Button></Link>
                  {
                    !auth.user ? (
                      <>
                        <Button style={{ borderRadius: "20px" }} onClick={handleClick}>
                          <AccountCircleOutlinedIcon style={{ color: '#87D309' }} /></Button>
                        <Menu
                          style={{
                            height: "auto",
                            borderRadius: "20px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                          }}
                          id="avatar-menu"
                          anchorEl={anchorEl1}
                          open={Boolean(anchorEl1)}
                          onClose={handleClose}>
                          <Box
                            style={{
                              width: "300px",
                              height: "auto",
                              // borderRadius: "20px",
                              fontFamily: "Arial, sans-serif",
                              fontSize: "16px",
                              textAlign: "center",
                              margin: "0 auto",
                              padding: "20px",
                              // backgroundColor: "#f5f5f5", // Background color
                              // boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // Box shadow
                            }}
                          >
                            <center>
                              <Avatar
                                alt="Sahil Mallick"

                                sx={{ width: 100, height: 100, borderRadius: "50%" }}
                              />
                            </center>
                            <b style={{ fontSize: "24px", color: "#333" }}>You are Not Login In!</b>
                            <Typography variant="body1" fontWeight={600} style={{ color: "#666" }}>
                              Login First .....
                            </Typography>
                            <Box style={{ marginTop: "10px" }}>
                              <Grid container spacing={2} style={{ marginBottom: '10px' }}>
                                <Grid item xs={6}>
                                  <Link to='/login' onClick={handleClose} style={{ textDecoration: 'none' }}>
                                    <Button
                                      size="small"
                                      variant="outlined"
                                      style={{
                                        borderColor: '#00c853',
                                        color: '#00c853',
                                        width: '100%',
                                        textTransform: 'none',
                                      }}
                                      startIcon={<LoginIcon />}
                                    >
                                      Login
                                    </Button>
                                  </Link>
                                </Grid>
                                <Grid item xs={6}>
                                  <Link to='/register' onClick={handleClose} style={{ textDecoration: 'none' }}>
                                    <Button
                                      size="small"
                                      variant="outlined"
                                      style={{
                                        borderColor: '#ff5722',
                                        color: '#ff5722',
                                        width: '100%',
                                        textTransform: 'none',
                                      }}
                                      startIcon={<VpnKey />}
                                    >
                                      Register
                                    </Button>
                                  </Link>
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                        </Menu>
                      </>
                    ) : (
                      <>
                        <Button style={{ borderRadius: "20px" }} onClick={handleClick2}>
                          <AccountCircleOutlinedIcon style={{ color: '#87D309' }} /></Button>
                        <Menu
                          style={{
                            height: "auto",
                            borderRadius: "20px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                          }}
                          id="avatar-menu"
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleClose2}>
                          <Box
                            style={{
                              width: "300px",
                              height: "auto",
                              fontFamily: "Arial, sans-serif",
                              fontSize: "16px",
                              textAlign: "center",
                              margin: "0 auto",
                              padding: "20px",
                            }}
                          >
                            <center>
                              <Avatar
                                alt="Sahil Mallick"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                                sx={{ width: 100, height: 100, borderRadius: "50%" }}
                              />
                            </center>
                            <b style={{ fontSize: "24px", color: "#333" }}>{auth.user.name}</b>
                            <Typography variant="body1" fontWeight={600} style={{ color: "#666" }}>
                              {auth.user.email}
                            </Typography>
                            <Box style={{ marginTop: "10px" }}>
                              <Grid container spacing={2} style={{ marginBottom: '10px' }}>
                                <Grid item xs={6}>
                                  <Link to='/profile' onClick={handleClose2} style={{ textDecoration: 'none' }}>
                                    <Button
                                      size="small"
                                      variant="outlined"
                                      style={{
                                        borderColor: '#00c853',
                                        color: '#00c853',
                                        width: '100%',
                                        textTransform: 'none',
                                      }}
                                      startIcon={<Person />}
                                    >
                                      Profile
                                    </Button>
                                  </Link>
                                </Grid>
                                <Grid item xs={6}>
                                  <Link to='/forgotpassword' style={{ textDecoration: 'none' }} onClick={handleClose2}>
                                    <Button
                                      size="small"
                                      variant="outlined"
                                      style={{
                                        borderColor: '#ff5722',
                                        color: '#ff5722',
                                        width: '100%',
                                        textTransform: 'none',
                                      }}
                                      startIcon={<VpnKey />}
                                    >
                                      Password
                                    </Button>
                                  </Link>
                                </Grid>
                              </Grid>
                            </Box>
                            <div style={{ textAlign: "center", marginTop: "20px", marginRight: "10px" }}>
                              <Button
                                variant="outlined"
                                color="warning"
                                startIcon={<ExitToApp />}
                                onClick={() => { exitapp(); }}
                                style={{ fontSize: "18px" }}
                              >
                                Logout
                              </Button>
                            </div>
                          </Box>

                        </Menu>
                      </>
                    )
                  }
                </Box>
                <Link to='/cartdetails'>
                  <IconButton style={{ borderRadius: "50px" }}>
                    <Badge badgeContent={cartItemCount} color="error">
                      <ShoppingCartOutlinedIcon style={{ color: 'black' }} />
                    </Badge>
                  </IconButton>
                </Link>
              </Box>
              <Menu
                style={{
                  height: "auto",
                  borderRadius: "20px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
                id="avatar-menu"
                anchorEl={anchorEl1}
                open={Boolean(anchorEl1)}
                onClose={handleClose}>
                <Box
                  style={{
                    width: "300px",
                    height: "auto",
                    // borderRadius: "20px",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "16px",
                    textAlign: "center",
                    margin: "0 auto",
                    padding: "20px",
                    // backgroundColor: "#f5f5f5", // Background color
                    // boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // Box shadow
                  }}
                >
                  <center>
                    <Avatar
                      alt="Sahil Mallick"

                      sx={{ width: 100, height: 100, borderRadius: "50%" }}
                    />
                  </center>
                  <b style={{ fontSize: "24px", color: "#333" }}>You are Not Login In!</b>
                  <Typography variant="body1" fontWeight={600} style={{ color: "#666" }}>
                    Login First .....
                  </Typography>
                  <Box style={{ marginTop: "10px" }}>
                    <Grid container spacing={2} style={{ marginBottom: '10px' }}>
                      <Grid item xs={6}>
                        <Link to='/login' onClick={handleClose} style={{ textDecoration: 'none' }}>
                          <Button
                            size="small"
                            variant="outlined"
                            style={{
                              borderColor: '#00c853',
                              color: '#00c853',
                              width: '100%',
                              textTransform: 'none',
                            }}
                            startIcon={<LoginIcon />}
                          >
                            Login
                          </Button>
                        </Link>
                      </Grid>
                      <Grid item xs={6}>
                        <Link to='/register' onClick={handleClose} style={{ textDecoration: 'none' }}>
                          <Button
                            size="small"
                            variant="outlined"
                            style={{
                              borderColor: '#ff5722',
                              color: '#ff5722',
                              width: '100%',
                              textTransform: 'none',
                            }}
                            startIcon={<VpnKey />}
                          >
                            Register
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}



export default Navbar;

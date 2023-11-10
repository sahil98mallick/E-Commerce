import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom';
import SimpleImageSlider from "react-simple-image-slider";
import { ScaleLoader } from 'react-spinners';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { toast } from 'react-toastify';
import { baseURL, fetchdetailsproduct, fetchrelatedproducts } from '../../ApiManager/AxiosManage';
import ProductSidebar from '../Common/ProductSidebar';
import { useAuth } from '../Context/Authentication';
import { useCart } from '../Context/ProductCart';
import Layout from '../../Layout/Layout';
import Swal from 'sweetalert2';

const ProductDetails = () => {
  const { slug } = useParams();
  const [cart, setcart] = useCart();
  const [product, setproduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [auth] = useAuth();
  const fetchproductdetail = async () => {
    try {
      const response = await fetchdetailsproduct(slug)
      setproduct(response.data.product)
      setloading(false)
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchproductdetail();
  }, [slug])
  console.log(product);

  // Fetch Related Products
  const { _id, category } = product;
  const categoryId = category ? category._id : null;

  console.log("Product ID:", _id);
  console.log("Category ID:", categoryId);
  const getrelatedproduct = async () => {
    try {
      const response = await fetchrelatedproducts(_id, categoryId)
      setRelatedProducts(response?.data?.products)
      setloading(false)
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getrelatedproduct();
  }, [_id, categoryId]);
  console.log("related products", relatedProducts);
  //  Add To Cart Products
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
        text: 'Only Product Quantity Increased',
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
  return (
    <Layout title={"Product Details"}>
      {
        !auth.user ? (
          <>
          </>
        ) : (
          <>
            <Box style={{ width: "100%", height: "auto", display: "flex", justifyContent: "space-evenly" }}>
              <Card style={{ width: "360px", height: "auto", background: "#F8F9F9" }} sx={{
                display: { xs: 'none', md: 'block' }, // Hide on small screens, show on medium and larger screens
              }}>
                <ProductSidebar />
              </Card>
              <Box style={{ width: "100%", background: "#F8F9F9", height: "auto" }}>
                <Divider />
                {
                  loading ? (
                    <>
                      <center>
                        <Box style={{ marginTop: "190px" }}>
                          <ScaleLoader
                            color="#c8d636"
                            height={50}
                          />
                        </Box>
                      </center>
                    </>
                  ) : (
                    <>
                      <Box>
                        <Grid container spacing={2} style={{ margin: "0 auto", marginTop: 15, maxWidth: "100%", backgroundColor: "#F8F9F9" }}>
                          <Grid item xs={12} sm={5} style={{ height: "500px" }}>
                            <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                              <img
                                src={`${baseURL}/api/product/product-photo/${product._id}`}
                                alt="Product Image"
                                style={{
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                  transition: "transform 0.3s",
                                  cursor: "pointer",
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.transform = "scale(1.1)";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.transform = "scale(1)";
                                }}
                              />
                            </Box>

                          </Grid>
                          {/* Second Grid */}
                          <Grid item xs={12} sm={7}>
                            {/* Card Design Start */}
                            <Box
                              style={{
                                maxWidth: 800,
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                margin: 'auto',
                                marginTop: 20,
                                marginRight: "5px",
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              <div style={{ textAlign: 'center', paddingTop: 20 }}>
                                <Typography variant="h5" style={{ fontFamily: "Times, sans-serif", fontWeight: 600, color: "#333" }}>
                                  {product.name}
                                </Typography>
                              </div>
                              <Box style={{ backgroundColor: "#f5f5f5", flex: 1 }}>
                                <Box style={{ textAlign: 'justify', padding: '10px', fontFamily: "Times New Roman, serif", color: "#555" }}>
                                  <h5><b>Category Name:</b> {product.category.slug}</h5>
                                </Box>
                              </Box>
                              <Box style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <Box style={{ backgroundColor: "#f5f5f5", padding: '10px', fontFamily: "Times New Roman, serif", color: "#666" }}>
                                  <h6><b>Brand:</b> {product.slug}</h6>
                                </Box>
                                <Divider />
                                <Box style={{ padding: '10px', fontFamily: "Times New Roman, serif", color: "#666", display: "flex", justifyContent: "space-evenly" }}>
                                  <p style={{ color: "black", fontSize: "20px" }}>Price: ${product.price}</p> <p style={{ color: "black", fontSize: "20px" }}>Availability: {product.quantity} in stock now</p>
                                </Box>
                                <Divider />
                              </Box>
                              <div style={{ marginLeft: 30 }}>
                                <Typography variant='h6' style={{ fontWeight: 800, fontFamily: "Arial, sans-serif", color: "#333", marginTop: 20 }}>
                                  Product Description:
                                </Typography>
                                <Box style={{ flex: 0 }}>
                                  <Typography variant="body2" style={{ fontFamily: "Times New Roman, serif", color: "black", textAlign: "center" }}>
                                    {product.description}
                                  </Typography>
                                </Box>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                                <Button variant='contained' color='secondary' style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#FF5722", color: "#fff", marginRight: 10 }}>
                                  <LocalAtmIcon />&nbsp;Buy Now
                                </Button>
                                <Button onClick={() => { cardadddetails(product) }} variant='contained' color='primary' style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#2196F3", color: "#fff" }}>
                                  <ShoppingCartIcon />&nbsp;Add to Cart
                                </Button>
                              </div>
                              <br />
                            </Box>
                            <Divider />
                            {/* Card Design End */}
                          </Grid>
                        </Grid>
                        <br /><br />
                        <center><h1>Similary Products</h1></center>
                        <Grid container spacing={2}>
                          {relatedProducts.length === 0 ? (
                            <Typography variant="h6" color="textSecondary">
                              No products available
                            </Typography>
                          ) : (
                            relatedProducts.map((product) => (
                              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                                <Card style={{ margin: "0 auto", borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>
                                  <CardMedia
                                    component="img"
                                    alt={product.name}
                                    height="150"
                                    image={`${baseURL}/api/product/product-photo/${product._id}`}
                                    style={{ borderRadius: '10px 10px 0 0' }}
                                  />
                                  <CardContent style={{ background: 'linear-gradient(90deg, rgba(183,182,194,1) 0%, rgba(215,218,209,1) 35%, rgba(0,212,255,1) 100%)', color: 'black', padding: '16px' }}>
                                    <Typography variant="h6" gutterBottom fontFamily={"Times"} fontWeight={800}>
                                      {product?.name?.slice(0, 25)}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                      {product?.description?.slice(0, 100)}
                                    </Typography>
                                    <Typography variant="h6" color="warning">
                                      Price: ${product.price}
                                    </Typography>
                                  </CardContent>
                                  <CardActions style={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', justifyContent: 'center' }}>
                                    <Link to={`/productdetails/${product?.slug}`}>
                                      <Button variant="contained" color="secondary">
                                        View Details
                                      </Button></Link>
                                  </CardActions>
                                </Card>
                              </Grid>

                            ))
                          )}
                        </Grid>
                      </Box>
                    </>
                  )
                }
              </Box>
            </Box>
          </>
        )
      }
    </Layout>
  )
}

export default ProductDetails
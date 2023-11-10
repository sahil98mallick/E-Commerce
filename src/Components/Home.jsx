import React, { useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { Box, Button, Card, Container, Paper, Typography } from '@mui/material'
import { banner } from './Additional/Style';
import Layout from '../Layout/Layout';

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Layout title={"Home"}>
      {/* Banner Section */}
      <Container maxWidth="100%">
        <Paper elevation={3} className="banner-container">
          <Box className="overlay"></Box>
          <Box className="banner-content">
            <Box>
              <Typography
                variant="h3"
                gutterBottom
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  borderRight: "2px solid transparent",
                  fontFamily: "Arial, sans-serif",
                  color: "white",
                  fontWeight: "550",
                  backgroundColor: "transparent",
                  padding: "10px",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  animation: "typing 3.5s steps(100, end)",
                }} >
                Welcome to Our ShopNest Store
              </Typography>
              <Typography variant="body1" gutterBottom className="banner-text" style={{ fontFamily: "Times", fontSize: "20px", color: "whitesmoke", animation: "typing 3.5s steps(100, end), blink-caret .75s step-end infinite", whiteSpace: "nowrap", overflow: "hidden", textAlign: "center" }}>
                Discover the latest products and exclusive offers.
              </Typography>
            </Box>
            <Button
              variant="contained"
              className="banner-button"
              style={{
                borderRadius: "50px",
                background: "#8CCB06",
                transition: "background 0.5s ease-in-out",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#E84828";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#8CCB06";
              }}
            >
              Shop Now
            </Button>
          </Box>
        </Paper>
      </Container>
      {/* End Banner Section */}
      {/* Start About website */}
      <Typography variant="h3" align='center' fontFamily={"Times"} style={{ "&hover": { color: "blue" } }}>
        About Us
      </Typography>
      <Box style={{ width: "100%", height: "auto", padding: "10px" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            transition: "background-color 0.3s",
            ":hover": {
              backgroundColor: "#f2f2f2",
            },
          }}
        >
          <Box
            style={{
              width: "40%",
              background: "#ffffff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
              transition: "transform 0.3s",
              ":hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.22)",
              },
            }}
          >
            <img
              src="https://www.getboost360.com/blog/wp-content/uploads/sites/12/2022/02/6-Reasons-Why-You-Should-Own-An-E-Commerce-Website-To-Sell-Your-Products.jpg"
              alt="E-Commerce Showcase"
              style={{ width: "100%", height: "auto", borderRadius: "12px" }}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </Box>
          <Box
            style={{
              width: "55%",
              background: "#ffffff",
              borderRadius: "12px",
              padding: "30px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              ":hover": {
                backgroundColor: "#fafafa",
              },
            }}
          >
            <center>
              <Typography variant="h4" component="h2" style={{ fontFamily: "'Segoe UI', sans-serif", color: "#00529B", fontWeight: "600" }}>
                Welcome to ShopNest
              </Typography>
            </center>
            <Typography
              variant="body1"
              style={{
                textAlign: "center",
                marginTop: "15px",
                fontFamily: "'Segoe UI', sans-serif",
                color: "#333333",
                lineHeight: "1.75",
                fontWeight: "400",
              }}
            >
              <i><b>Mission</b></i> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem, eaque ut alias dolorum nulla facere aut consectetur enim, sequi vel tempore ullam sint ipsa vitae aspernatur quisquam molestiae soluta commodi exercitationem repellendus voluptate assumenda quae numquam. Unde porro, quidem consectetur nesciunt nisi ipsa inventore doloremque cum, necessitatibus architecto eaque dolorum, numquam maiores recusandae. Sapiente, fuga? Voluptate doloribus similique, optio magni fugiat ipsa voluptates voluptatum qui molestiae aut maxime assumenda ea atque nisi. <br />
              <i><b>Vission</b></i> Ab, vel beatae, quis obcaecati molestias dolore commodi enim animi ipsum a nisi! Non quasi ab quia quidem vel laudantium voluptatibus fuga, voluptatem neque nihil reprehenderit, distinctio labore delectus earum placeat architecto quo mollitia in consectetur voluptate tempora, et repellat? Illum quidem vero perferendis error! Nobis nisi praesentium quam quasi tempora reiciendis accusamus, temporibus dolores odio molestias eaque blanditiis ducimus nostrum! Debitis, eius quidem mollitia consectetur unde sint illum. Rem explicabo cupiditate sapiente animi dolore dicta vel inventore!
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* Start About website */}
      {/* Start product Design Part */}

      <Box style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
        <Box style={{ width: "50%", background: "", borderRadius: "50px" }}>
          <Carousel
            height="425px"
            index={activeIndex}
            autoPlay={true}
            animation="slide"
            timeout={300}
            navButtonsAlwaysVisible={true}
            fullHeightHover={true}
            navButtonsProps={{
              style: {
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '50%',
                color: 'white',
                width: '36px',
                height: '36px',
                margin: '0 10px',
              },
            }}
            onChange={(index) => setActiveIndex(index)}
          >
            {banner.map((banner, index) => (
              <Paper key={index} elevation={3} style={{ margin: 10, height: "auto", maxWidth: '100%', borderRadius: "50px" }}>
                <div style={{ position: 'relative' }}>
                  <img src={banner.image} alt={`Image ${index}`} style={{ width: '100%', height: 'auto', maxWidth: '100%', maxHeight: '58vh', borderRadius: "50px" }} />
                </div>
              </Paper>
            ))}
          </Carousel>
        </Box>
        <Box style={{ width: "50%", background: "", borderRadius: "50px" }}>
          <Card style={{
            margin: "0 auto",
            marginTop: "20px",
            width: "600px",
            height: "400px",
            borderRadius: "20px",
            display: "flex",
            alignContent: "center",
            justifyContent: "space-evenly",
            gap: "30px",
            flexWrap: "wrap"
          }}>
            <Box style={{
              width: "250px",
              height: "150px",
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transition: "box-shadow 0.3s",
              cursor: "pointer",
            }}>
              <img
                src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?cs=srgb&dl=pexels-karolina-grabowska-4041392.jpg&fm=jpg"
                alt="Product Image"
                style={{
                  width: "100%",
                  height: "110px",
                  objectFit: "cover",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
              <Box style={{ textAlign: "center" }}>
                <Typography variant="h6" style={{ color: '#333', fontFamily: "Times", fontWeight: "550" }}>
                  Product Name
                </Typography>
              </Box>
            </Box>
            <Box style={{
              width: "250px",
              height: "150px",
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transition: "box-shadow 0.3s",
              cursor: "pointer",
            }}>
              <img
                src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?cs=srgb&dl=pexels-karolina-grabowska-4041392.jpg&fm=jpg"
                alt="Product Image"
                style={{
                  width: "100%",
                  height: "110px",
                  objectFit: "cover",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
              <Box style={{ textAlign: "center" }}>
                <Typography variant="h6" style={{ color: '#333', fontFamily: "Times", fontWeight: "550" }}>
                  Product Name
                </Typography>
              </Box>
            </Box>
            <Box style={{
              width: "250px",
              height: "150px",
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transition: "box-shadow 0.3s",
              cursor: "pointer",
            }}>
              <img
                src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?cs=srgb&dl=pexels-karolina-grabowska-4041392.jpg&fm=jpg"
                alt="Product Image"
                style={{
                  width: "100%",
                  height: "110px",
                  objectFit: "cover",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
              <Box style={{ textAlign: "center" }}>
                <Typography variant="h6" style={{ color: '#333', fontFamily: "Times", fontWeight: "550" }}>
                  Product Name
                </Typography>
              </Box>
            </Box>
            <Box style={{
              width: "250px",
              height: "150px",
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transition: "box-shadow 0.3s",
              cursor: "pointer",
            }}>
              <img
                src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?cs=srgb&dl=pexels-karolina-grabowska-4041392.jpg&fm=jpg"
                alt="Product Image"
                style={{
                  width: "100%",
                  height: "110px",
                  objectFit: "cover",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
              <Box style={{ textAlign: "center" }}>
                <Typography variant="h6" style={{ color: '#333', fontFamily: "Times", fontWeight: "550" }}>
                  Product Name
                </Typography>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
      {/* End product Design  Part */}
      <br />
      <br />
    </Layout>
  )
}

export default Home
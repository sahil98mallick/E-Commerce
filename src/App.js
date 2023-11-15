import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import Products from './Components/Products/Products';
import ProductDetails from './Components/Products/ProductDetails';
import CategoryWiseProducts from './Components/Products/CategoryWiseProducts';
import SearchProducts from './Components/Products/SearchProducts';
import Login from './Components/Login';
import Register from './Components/Register';
import ForgotPassword from './Components/ForgotPassword';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AddToCart from './Components/Products/AddtoCart';
import UpdateProfile from './Components/UpdateProfile';
import Profile from './Components/Profile';
import { useAuth } from './Components/Context/Authentication';
import Navbar from './Components/Common/Navbar';
import Footer from './Components/Common/Footer';


function App() {
  const [auth] = useAuth();
  function PrivateRoute({ children }) {
    const token = localStorage.getItem("auth") || sessionStorage.getItem("auth");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  }
  const PublicRoute = [
    {
      path: "/",
      components: <Home />
    },
    {
      path: "/login",
      components: auth?.token ? <Navigate to="/profile" /> : <Login />
    },
    {
      path: "/register",
      components: auth?.token ? <Navigate to="/profile" /> : <Register />
    },
    {
      path: "/products",
      components: <Products />
    },
    {
      path: "/searchproducts",
      components: <SearchProducts />
    },
    {
      path: "/categorywiseproducts/:slug",
      components: <CategoryWiseProducts />
    },
  ]

  const ProtectedRoute = [
    {
      path: "/updateprofile",
      components: <UpdateProfile />
    },
    {
      path: "/forgotpassword",
      components: <ForgotPassword />
    },
    {
      path: "/productdetails/:slug",
      components: <ProductDetails />
    },
    {
      path: "/cartdetails",
      components: <AddToCart />
    },
    {
      path: "/profile",
      components: <Profile />
    },
  ]
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Navbar />
        <Routes>


          {/* Public Route */}
          {
            PublicRoute?.map((item, key) => {
              return (
                <>
                  <Route
                    key={key + 1}
                    path={item.path}
                    element={item.components} />
                </>
              )
            })
          }
          {/* Private Route */}
          {
            ProtectedRoute?.map((item, key) => {
              return (
                <>
                  <Route
                    key={key + 1}
                    path={item.path}
                    element={<PrivateRoute>{item.components}</PrivateRoute>} />
                </>
              )
            })
          }




          {/* <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/updateprofile' element={<UpdateProfile />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/products' element={<Products />} />
          <Route path="/productdetails/:slug" element={<ProductDetails />} />
          <Route path="/cartdetails" element={<AddToCart />} />
          <Route path="/categorywiseproducts/:slug" element={<CategoryWiseProducts />} />
          <Route path="/searchproducts" element={<SearchProducts />} /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

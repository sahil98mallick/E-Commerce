import axios from "axios"

// export const baseURL = `${process.env.REACT_APP_API}`
export const baseURL = "https://e-commercenodewebserver.onrender.com"



//======================================== User Credential Functionality================================================
// Register API Implementation
export const registerfunction = async (data) => {
    return await axios.post(`${baseURL}/api/auth/register`, data)
}
// Login API Call here
export const loginfunction = async (data) => {
    return await axios.post(`${baseURL}/api/auth/login`, data)
}
// Login API Call here
export const forgotpassword = async (data) => {
    return await axios.post(`${baseURL}/api/auth/forgot-password`, data)
}
// Login API Call here
export const updateprofile = async (data) => {
    return await axios.put(`${baseURL}/api/auth/profile`, data)
}

// ====================================== Products =======================================
// fetch product Details
export const fetchproducts = async () => {
    return await axios.get(`${baseURL}/api/product/get-product`)
}
// fetch product category Details
export const fetchproductcategories = async () => {
    return await axios.get(`${baseURL}/api/category/all-category`)
}
// fetch product category wise Details
export const fetchproductcategorywise = async (slug) => {
    return await axios.get(`${baseURL}/api/product/product-category/${slug}`)
}
// fetch product details 
export const fetchdetailsproduct = async (slug) => {
    return await axios.get(`${baseURL}/api/product/get-product/${slug}`)
}

// Fetch Related Products
export const fetchrelatedproducts = async (pid, cid) => {
    return await axios.get(`${baseURL}/api/product/related-product/${pid}/${cid}`)
}

// Payment Gateway
export const fetchpayment = async () => {
    return await axios.get(`${baseURL}/api/product/braintree/token`)
}

// Search Products
export const searchproducts = async (keyword) => {
    return await axios.get(`${baseURL}/api/product/search/${keyword}`)
}


// Admin Section
export const addcat = async (data) => {
    return await axios.post(`${baseURL}/api/category/create-category`, data)
}
export const delcat = async (id) => {
    return await axios.post(`${baseURL}/api/category/delete-category/${id}`)
}


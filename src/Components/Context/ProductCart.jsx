import React, { createContext, useContext, useEffect, useState } from 'react'


const CartContext = createContext();
const ProductCart = ({ children }) => {
    const [cart, setcart] = useState({
        products: []
    })
    useEffect(() => {
        const data = localStorage.getItem("cart");
        const response = JSON.parse(data)
        if (response) {
            setcart({
                ...cart,
                products: response.products
            })
        }
    }, [])
    return (
        <CartContext.Provider value={[cart, setcart]}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext);

export { useCart, ProductCart }

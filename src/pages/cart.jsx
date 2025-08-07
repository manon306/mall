import React, { useEffect, useState } from "react";
import CustomizedDialogs from "../Components/dialog";
import { useGlobalContext } from "../Components/context";
import { Navigate ,useNavigate } from "react-router-dom";

export default function CartPage() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const { setOpen } = useGlobalContext();
    
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    const removeItem = (indexToRemove) => {
        const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.location.href = "/";
    };

    const getTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-6">
            <div className=" shadow-md rounded-lg p-8 max-w-3xl w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
                {/** if cart empty?     : have elements */}
                {cartItems.length === 0 ? (
                    <div className="text-center">
                        <p className="text-gray-600 mb-2">Your cart is currently empty.</p>
                        <p className="text-gray-600 mb-6">Start shopping to add items to your cart!</p>
                        <a href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                            Go back to Home
                        </a>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex items-center justify-between border-b pb-4">
                                    <div className="flex items-center space-x-4">
                                        <img src={item.image} alt={item.title} className="w-16 h-16 rounded object-contain" />
                                        <div>
                                            <h3 className="text-lg font-semibold">{item.title}</h3>
                                            <p className="text-gray-500">${item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <button 
                                        className="text-red-500 hover:text-red-700 font-bold transition-colors"
                                        onClick={() =>{removeItem(index);
                                        } }
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* //total price and checkout button */}
                        <div className="mt-6 flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Total: ${getTotal()}</h2>
                            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                            onClick={() => navigate("/payment") }
                                
                            
                            >
                                
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}







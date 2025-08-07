import React from 'react';
import "../index.css";
import { useState } from 'react';
import { Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import CustomSnackbar from '../snakbars/addtocart';

export default function Card({ title, image, description, price, oldprice }) {
  const [open, setOpen] = useState(false);

  const handleAddToCart = () => {
    const newItem = { title, image, price };
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => 
      item.title === title && item.image === image
    );
    
    if (existingItemIndex >= 0) {
      // Item exists, you could update quantity here if needed
      cart[existingItemIndex] = newItem;
    } else {
      // Item doesn't exist, add new item
      cart.push(newItem);
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    setOpen(true);
    
    // Optional: You can navigate to cart page immediately or let user stay
    // window.location.href = "/cart";
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <div className="card max-w-sm rounded shadow-lg m-4 relative overflow-hidden group" 
         style={{ width: '300px', height: '400px' }}>
      <img className="w-full h-48 object-cover" style={{objectFit:"contain"}} src={image} alt={title} />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base line-clamp-2">{description}</p>
        {oldprice && (
          <p className="text-gray-500 line-through mt-2">${oldprice.toFixed(2)}</p>
        )}
        <p className="text-gray-900 font-bold text-lg mt-2">${price.toFixed(2)}</p>
      </div>

      <div className="absolute bottom-0 left-0 w-full px-6 pb-4 transform group-hover:translate-y-0 group-hover:opacity-100 translate-y-full opacity-0 transition-all duration-300 ease-in-out">
        <button 
          className="bg-black text-white font-bold py-2 px-4 rounded w-full hover:bg-gray-800 transition-colors"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
      
      <CustomSnackbar
        open={open}
        handleClose={handleClose}
        message="Added to cart successfully!"
      />
    </div>
  );
}
export function Smallcard({title, date,link}){
  return(
    <div className='p-5 m-2' style={{ width: '400px', height: '450px' }}>
      <img src={link} alt='thumbnail' className='w-full h-32 object-cover  mb-2 transition-transform duration-500 ease-in-out hover:scale-110 cursor-pointer ' style={{height:"70%",objectFit:"contain"}}  />
      <p className='text-gray-600 text-sm p-2'>{date}</p>
      <h3 className='text-3xl font-semibold mb-1 cursor-pointer p-3'>{title}</h3>
      <Divider className='my-2' />
      <div className='flex justify-between items-center'>
          <p className='text-gray-500 p-2'>inspiration</p>
          <div className='flex flex-row items-center space-x-2 p-3'>
              <FacebookIcon  />
              <TwitterIcon  />
              <InstagramIcon/>
          </div>
      </div>
    </div>
  )
}


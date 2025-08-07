import React, { useState } from "react";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/material/styles';

const items = [
  {
    key: 1,
    h1: "LIFE OF THE WILD",
    p: "Explore the wilderness with our exclusive collection of wildlife photography books. Dive into the heart of nature and discover the beauty of the wild.",
    img: "https://themewagon.github.io/booksaw/images/main-banner1.jpg",
    button: "Explore Now",
  },
  {
    key: 2,
    h1: "URBAN EXPLORATION",
    p: "Uncover the hidden gems of the city with our urban exploration guides. From abandoned buildings to street art, experience the urban landscape like never before.",
    img: "https://m.media-amazon.com/images/I/81af+MCATTL._AC_UF1000,1000_QL80_.jpg",
    button: "Discover More",
  },
  {
    key: 3,
    h1: "UNDERWATER ADVENTURES",
    p: "Dive into the depths of the ocean with our underwater adventure series. Explore coral reefs, marine life, and the mysteries of the deep blue sea.",
    img: "https://themewagon.github.io/booksaw/images/product-item1.jpg",
    button: "Start Diving",
  },
  {
    key: 4,
    h1: "MOUNTAIN ESCAPES",
    p: "Experience the serenity of the mountains with our collection of hiking and trekking guides. Find your next adventure in the great outdoors.",
    img: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=60",
    button: "Plan Your Trip",
  },
];

const StyledButton = styled(Button)(() => ({
  minWidth: '45px',
  height: '45px',
  borderRadius: '50%',
  padding: '0',
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
}));

export default function Slider() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const current = items[index];

  return (
    <div className="relative w-full h-[700px] overflow-hidden ">
      
      {/* زرار السابق */}
      <StyledButton onClick={handlePrev} sx={{ left: '20px' }}>
        <ArrowBackIosNewIcon fontSize="small" />
      </StyledButton>

      {/* زرار التالي */}
      <StyledButton onClick={handleNext} sx={{ right: '20px' }}>
        <ArrowForwardIosIcon fontSize="small" />
      </StyledButton>

      {/* المحتوى */}
      <div className="w-full h-full flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6">
        
        {/* النص */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{current.h1}</h1>
          <p className="text-gray-700 text-lg">{current.p}</p>
          <Button 
            variant="contained" 
            sx={{
              backgroundColor: '#222',
              color: '#fff',
              padding: '14px 28px',
              fontSize: '1rem',
              borderRadius: '8px',
              textTransform: 'capitalize',
              '&:hover': { backgroundColor: '#444' }
            }}
          >
            {current.button}
          </Button>
        </div>

        {/* الصورة */}
        <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
          <img
            src={current.img}
            alt={current.h1}
            className="w-[90%] h-[300px] md:h-[400px] object-cover rounded-xl shadow-lg transform transition duration-500 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}

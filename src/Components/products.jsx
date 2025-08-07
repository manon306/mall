// Products.jsx
import React, { useState } from "react";
import { Container, Grid, Typography } from '@mui/material';
import { useEffect } from "react";
import fetchProducts from "./data";
import ProductCard from "./card";
 import CategoryFilter from "./togglebutton";


export default function Products() {
  const [category, setCategory] = useState('all');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);
  
  const filteredProducts = category === 'all' 
    ? products
    : products.filter(p => p.category === category);

  return (
    <div className="flex">

    <Container maxWidth="xl" sx={{ py: 4, minHeight: '100vh' }} className="flex-64">
      <Typography variant="h4" component="h1" gutterBottom sx={{ 
        fontWeight: 600, 
        textAlign: 'center',
        mb: 4,
        color: 'text.primary'
      }}>
        منتجاتنا
      </Typography>
      
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard  product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
    <CategoryFilter  className="flex-14 mt-4"
        value={category} 
        onChange={(event, newCategory) => setCategory(newCategory || 'all')} 
      />
    </div>
  );
}
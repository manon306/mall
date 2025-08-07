import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box, Typography } from '@mui/material';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'smartphones', label: 'Smartphones' },
  { value: 'laptops', label: 'Laptops' },
  { value: 'fragrances', label: 'Fragrances' },
  { value: 'skincare', label: 'Skincare' },
  { value: 'groceries', label: 'Groceries' },
  { value: 'home-decoration', label: 'Home Decoration' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'womens-dresses', label: 'Women Dresses' },
  { value: 'mens-shirts', label: 'Men Shirts' },
  { value: 'womens-jewellery', label: 'Women Jewellery' },
  { value: 'sunglasses', label: 'Sunglasses' }
];

export default function CategoryFilter({ value, onChange }) {
  return (
    <Box 
      sx={{
        width: 280,
        minHeight: '100vh',
        bgcolor: 'background.paper',
        boxShadow: 2,
        p: 2,
        position: 'sticky',
        top: 0,
        alignSelf: 'flex-start'
      }}
    >
      
      <ToggleButtonGroup
        color="primary"
        value={value}
        exclusive
        onChange={onChange}
        aria-label="Product categories"
        orientation="vertical"
        sx={{
          width: '100%',
          gap: 1,
          '& .MuiToggleButton-root': {
            borderRadius: '8px !important',
            border: '1px solid',
            borderColor: 'divider',
            fontWeight: 500,
            textTransform: 'capitalize',
            justifyContent: 'flex-start',
            px: 3,
            py: 1,
            transition: 'all 0.3s ease',
            '&.Mui-selected': {
              bgcolor: 'primary.light',
              color: 'primary.dark',
              borderColor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.light'
              }
            },
            '&:hover': {
              bgcolor: 'action.hover'
            }
          }
        }}
        fullWidth
      >
        {categories.map((category) => (
          <ToggleButton 
            key={category.value} 
            value={category.value}
            sx={{
              fontSize: '0.875rem'
            }}
          >
            {category.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
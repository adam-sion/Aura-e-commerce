
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MuiBreadcrum } from "../MuiBreadcrum/MuiBreadcrum";
import { Product } from "../../types/Product";
import all_product from "../../data/all_product.ts";
import { Box, Button, ButtonGroup, Divider, Typography } from "@mui/material";
import './ProductDetails.css';
import { Order } from "../../types/Order.ts";
import { useShoppingList } from "../../contexts/shoppingCartContext.tsx";

export const ProductDetails:FC = ()=> {
    const [product, setProduct] = useState<Product|undefined>();
    const {addItem} = useShoppingList();
    const [order, setOrder] = useState<Order|undefined>();

    const sizes:Pick<Order, 'size'>[] = [{size:'XS'},{size:'S'},{size:'M'},{size:'L'},{size:'XL'} ];

    const {productId} = useParams();

    useEffect(()=> {
     const foundProduct = all_product.find((item)=> item.id === Number(productId))
     setProduct(foundProduct);
    },[])
return (
    <div style={{marginLeft:'2vw'}}>
    <MuiBreadcrum product={product} />
    <Box
  sx={{
    width: '50vw',
    height: { xs: '150vh', sm: '400vh', md: '70vh' },  // Adjust height for small screens
    display: 'flex',
    backgroundImage: 'linear-gradient(to left, lightblue, white)',  // Blue color with 50% transparency
    flexDirection: 'row',  // Stack on small screens, row on larger screens
    p: { xs: 2, md: 5 },  // Add padding for smaller screens
  }}
>
    <Box sx={{width:'50%', height: '100%', display:'flex', flexDirection:'row'}}>

   
<Box sx={{display:"flex", flexDirection:'column', width:"20%", height:'100%', marginRight:'1vw'}}>

<img style={{marginBottom:'25%', marginTop:'25%'}}  height={'20%'} src={product?.image} alt="" />
<img style={{marginBottom:'25%'}}  height={'20%'} src={product?.image} alt="" />
<img style={{marginBottom:'25%'}}  height={'20%'} src={product?.image} alt="" />
<img  height={'20%'} src={product?.image} alt="" />
</Box>

<Box sx={{display:"flex", flexDirection:'column', width:"80%", height:'100%', backgroundColor:'purple'}}>
<img height={'100%'} src={product?.image} alt="" />
</Box>
</Box>

<Box sx={{width:'40%', height: '100%', marginLeft:'2vw'}}>
<Typography
  sx={{
    fontSize:'5vh',
    fontFamily: 'Georgia, Times New Roman, serif',  // Formal serif font
    fontWeight: 'bold',  // Optional: Make it bold to stand out
  }}
>
  {product?.name}
</Typography>

<Typography

  sx={{
    fontSize:'4vh',
    fontFamily: 'Georgia, Times New Roman, serif',  // Formal serif font
    fontWeight: 'bold',
    marginTop:'2vh',
    color: '#FF4D4D',
    marginLeft:'1vw'  // Optional: Make it bold to stand out
  }}
>
  ${product?.price}
</Typography>

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: { xs: 'column', md: 'column' }, // Stack vertically on small screens, same for medium
        alignItems: 'center',
        width: '100%',
        p: { xs: 2, md: 4 }, // Padding changes based on screen size
      }}
    >
      <Divider
        sx={{
          width: '100%', // Ensure the Divider spans the container width
          borderBottomWidth: '1px', // This controls the thickness of the Divider
          borderColor: 'black', // Set the color of the Divider
          mt: 2, // Optional: Add margin above the Divider
          mb: 4, // Optional: Add margin below the Divider
        }}
      />
      <Typography
        sx={{ fontFamily: 'Georgia, Times New Roman, serif', marginBottom: '2vh', fontSize: { xs: '1.5rem', md: '2rem' } }} // Responsive font size
        variant="h3"
      >
        Select size:
      </Typography>

      <ButtonGroup sx={{ gap: 2, marginTop: '2vh' }} aria-label="size selection">
        {sizes.map((sizeObj) => (
          <Button
            key={sizeObj.size} // Add a key to each button
            onClick={() => setOrder({ ...product!!, size: sizeObj.size })} // Access size from sizeObj
            sx={{
              width: { xs: 40, md: 50 }, // Responsive width
              height: { xs: 40, md: 50 }, // Responsive height
              borderRadius: 0,
              backgroundColor: 'black',
              color: 'white',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            {sizeObj.size}
          </Button>
        ))}
      </ButtonGroup>

      <Button
        variant="contained" // Use contained style for a filled button
        sx={{
          backgroundColor: '#f44336', // Beautiful red color
          color: 'white', // White text color
          borderRadius: 20, // Rounded corners
          padding: { xs: '8px 16px', md: '10px 20px' }, // Responsive padding
          fontSize: { xs: '14px', md: '16px' }, // Responsive font size
          fontWeight: 'bold', // Bold text
          boxShadow: 3,
          marginTop: '7vh', // Slight shadow for depth
          '&:hover': {
            backgroundColor: '#d32f2f', // Darker red on hover
            boxShadow: 6, // Increased shadow on hover
          },
        }}
        onClick={()=> addItem(order!!)}
      >
        Add to Cart
      </Button>
    </Box>


</Box>
    </Box>
    </div>
)
}
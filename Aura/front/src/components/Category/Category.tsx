import { FC, useRef } from "react";
import { Product } from "../../types/Product";
import { Box, Button, Divider, Typography } from "@mui/material";
import kid from "../../Assets/kid.png"
import man from "../../Assets/man.png"
import woman from "../../Assets/woman.png"

import EastIcon from '@mui/icons-material/East';
import { Gallery } from "../Gallery/Gallery";
import all_product from "../../data/all_product.ts";

interface CategoryProps {
    category: Product["category"]
}

export const Category:FC<CategoryProps> = ({category})=> {
const uniqueColor = category === 'kid' ? 'green' : category === 'men'? 'blue': 'purple';
    
const scroll = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

    const sectionRef = useRef<null | HTMLDivElement>(null);
    return (<>
        <Box
    sx={{
      width: '100vw',
      height: { xs: '110vh', sm: '300vh', md: '50vh' },  // Adjust height for small screens
      background: `linear-gradient(80deg, white 0%, ${uniqueColor} 100%)`,
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },  // Stack on small screens, row on larger screens
      alignItems: 'center',
      p: { xs: 2, md: 5 },  // Add padding for smaller screens
    }}
  >
    <Typography
      sx={{
        display: 'flex',
        marginLeft: { md: '15%' },
        marginRight: { md: category === woman ? '5%': '0' },
        flexDirection: 'column',
        textAlign: { xs: 'center', md: 'left' },  // Center text on small screens, align left on larger screens
        width: { xs: '100%', md: '50%' },  // Full width on small screens, 30% on larger screens
      }}
      component="div"
    >
     <Box
  sx={{
    fontSize: { xs: '16vw', sm: '12vw', md: '6vw' },  // Adjust font size for different screen sizes
    m: 1,
    color: uniqueColor,  // Set the text color to color
    fontFamily: '"Comic Sans MS", "Comic Sans", cursive', // Use a balloon-like font style
    fontWeight: 'bold',  // Make the font bold for a balloon effect
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)', // Optional: Add a slight shadow for a lifted effect
  }}
>
  FLAT 50% OFF
</Box>

  
<Box
  sx={{
    fontSize: { xs: '6vw', sm: '5vw', md: '3.5vw' }, // Adjust font size for different screen sizes
    m: 1,
    color: 'white', // Set the default text color to white
    fontFamily: '"Poppins", sans-serif', // Beautiful font (or any preferred font)
    fontWeight: 'bold', // Add some boldness for a strong appearance
  }}
>
  special{' '}
  <Box component="span" sx={{ color: uniqueColor }}>
    {category}
  </Box>{' '}
  collection
</Box>

  <Box sx={{display:'flex', justifyContent:'row',width: { xs: '70%', sm: '60%', md: '50%' },
          alignSelf: { xs: 'center', md: 'flex-start' },}}>
        <Button
      onClick={()=> scroll()}
        sx={{
          borderRadius: '20px',
          marginTop: 3,
          bgcolor: 'whitesmoke',
        }}
        variant="contained"
      >
       <Box
  sx={{
    fontSize: { xs: '3vw', md: '1.5vh' }, // Responsive text size
    fontFamily: '"Comic Sans MS", "Comic Sans", cursive', // Playful, childlike font
    color: '#FF69B4', // Bright pink to give it a fun and childlike vibe
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Add depth with a soft shadow
    letterSpacing: '0.05em', // Slightly increase letter spacing for better readability
    fontWeight: 'bold', // Balloon-like boldness
  }}
>
  OUR Collection
</Box>

        <EastIcon sx={{ marginLeft: 2, fontSize: { xs: '4vw', md: '2vh' } }} />  {/* Adjust icon size */}
      </Button>
      </Box>
    </Typography>
  

    <img
      src={category === 'kid' ? kid : category === 'men' ? man : woman}
      alt=""
      style={{
        height: '90%',
        width: category === 'men' ? '30vw': 'auto',   
      }}
    />
  </Box>


<div ref={sectionRef} style={{marginTop:'10vh'}}>
      <Divider
  sx={{
    borderBottomWidth: '10px',  // This controls the thickness of the Divider
    borderColor: 'black',  // Optional: Set the color of the Divider
    fontWeight: 'fontWeightMedium',
    mb: 4, // Optional: Add margin below the Divider
  }}
>
  <Typography variant="h3">Our Collection</Typography>
</Divider>
<Box sx={{marginLeft:'5vw'}}>
<Gallery products={all_product.filter((item)=> item.category === category)}></Gallery>
</Box>
</div>
</>
    )
}
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
      height: { xs: '110vh', sm: '300vh', md: '50vh' }, 
      background: `linear-gradient(80deg, white 0%, ${uniqueColor} 100%)`,
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      alignItems: 'center',
      p: { xs: 2, md: 5 },  
    }}
  >
    <Typography
      sx={{
        display: 'flex',
        marginLeft: { md: '15%' },
        marginRight: { md: category === woman ? '5%': '0' },
        flexDirection: 'column',
        textAlign: { xs: 'center', md: 'left' }, 
        width: { xs: '100%', md: '50%' },  
      }}
      component="div"
    >
     <Box
  sx={{
    fontSize: { xs: '16vw', sm: '12vw', md: '6vw' },  
    m: 1,
    color: uniqueColor,  
    fontFamily: '"Comic Sans MS", "Comic Sans", cursive', 
    fontWeight: 'bold',  
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  }}
>
  FLAT 50% OFF
</Box>

  
<Box
  sx={{
    fontSize: { xs: '6vw', sm: '5vw', md: '3.5vw' }, 
    m: 1,
    color: 'white',
    fontFamily: '"Poppins", sans-serif', 
    fontWeight: 'bold', 
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
    fontSize: { xs: '3vw', md: '1.5vh' }, 
    fontFamily: '"Comic Sans MS", "Comic Sans", cursive', 
    color: '#FF69B4', 
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', 
    letterSpacing: '0.05em', 
    fontWeight: 'bold', 
  }}
>
  OUR Collection
</Box>

        <EastIcon sx={{ marginLeft: 2, fontSize: { xs: '4vw', md: '2vh' } }} />  
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
    borderBottomWidth: '10px',  
    borderColor: 'black',  
    fontWeight: 'fontWeightMedium',
    mb: 4,
  }}
>
  <Typography variant="h3" sx={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive'}}>Our Collection</Typography>
</Divider>
<Box sx={{marginLeft:'5vw'}}>
<Gallery products={all_product.filter((item)=> item.category === category)}></Gallery>
</Box>
</div>
</>
    )
}
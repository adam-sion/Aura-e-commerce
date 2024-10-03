import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import heroPic from "../../Assets/hero_image.png"
import handPic from "../../Assets/hand_icon.png"
import EastIcon from '@mui/icons-material/East';

interface HeroProps {
    scroll: ()=> void
}
export const Hero:FC<HeroProps> = ({scroll})=> {
return (
    <Box
    sx={{
      width: '100vw',
      height: { xs: '110vh', sm: '300vh', md: '50vh' },  // Adjust height for small screens
      background: 'linear-gradient(to right, #fc5c7d, #6a82fb)',
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },  // Stack on small screens, row on larger screens
      alignItems: 'center',
      p: { xs: 2, md: 5 },  // Add padding for smaller screens
    }}
  >
    <Typography
      sx={{
        display: 'flex',
    
        flexDirection: 'column',
        textAlign: { xs: 'center', md: 'left' },  // Center text on small screens, align left on larger screens
        width: { xs: '100%', md: '30%' },  // Full width on small screens, 30% on larger screens
        marginLeft: { md: '20%' },
        marginRight: { md: '5%' }  // Only apply margin on larger screens
      }}
      component="div"
    >
      <Box
        sx={{
          fontSize: { xs: '4vw', sm: '3vw', md: '1.5vw' },  // Adjust font size for different screen sizes
          m: 1,
      fontFamily: '"Montserrat", sans-serif', // Beautiful modern font
    fontWeight: '600',  // Bold to give it prominence
    color: '#333',  // Dark gray color for an elegant look
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',  // Subtle shadow for depth
    letterSpacing: '0.05em'
        }}
      >
        New Arrivals Only
      </Box>
  
      <Box
  sx={{
    fontSize: { xs: '6vw', sm: '5vw', md: '3.5vw' }, // Adjust font size for different screen sizes
    m: 1,
    whiteSpace: 'pre-line',  // Center the text for a balanced look
    lineHeight: 1.2,  // Adjust line height for better spacing between lines
    fontFamily: '"Playfair Display", serif', // Use a stylish, elegant font
    fontWeight: '700',  // Make the font bold for emphasis  // Beautiful vibrant orange for the text  // Slightly increase letter spacing for readability
    textTransform: 'uppercase',  // Make all letters uppercase for a modern look
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',  // Add a subtle shadow for depth
  }}
>
  {"new Aura\ncollections\nfor everyone"}
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
  Latest Collection
</Box>

        <EastIcon sx={{ marginLeft: 2, fontSize: { xs: '4vw', md: '2vh' } }} />  {/* Adjust icon size */}
      </Button>
      <Box sx={{display:'flex', alignItems:'end', marginLeft:2}}>
      <img src={handPic} alt="" height={'40vh' }/>
      </Box>
      </Box>
    </Typography>
  
    <img
      src={heroPic}
      alt=""
      style={{
        height: '90%',
        width: 'auto',  
        maxWidth: '100%', 
      }}
    />
  </Box>
  
)
}
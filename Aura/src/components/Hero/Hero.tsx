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
        marginLeft: { md: '20%' },  // Only apply margin on larger screens
      }}
      component="div"
    >
      <Box
        sx={{
          fontSize: { xs: '4vw', sm: '3vw', md: '1.5vw' },  // Adjust font size for different screen sizes
          m: 1,
        }}
      >
        New Arrivals Only
      </Box>
  
      <Box
        sx={{
          fontSize: { xs: '6vw', sm: '5vw', md: '3.5vw' },  // Adjust font size for different screen sizes
          m: 1,
          whiteSpace: 'pre-line',
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
        <Box sx={{ fontSize: { xs: '3vw', md: '1.5vh' } }}>  {/* Responsive text size */}
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
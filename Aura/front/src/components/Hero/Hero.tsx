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
      height: { xs: '110vh', sm: '300vh', md: '50vh' },  
      background: 'linear-gradient(to right, #fc5c7d, #6a82fb)',
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },  
      alignItems: 'center',
      p: { xs: 2, md: 5 }, 
    }}
  >
    <Typography
      sx={{
        display: 'flex',
    
        flexDirection: 'column',
        textAlign: { xs: 'center', md: 'left' },  
        width: { xs: '100%', md: '30%' },  
        marginLeft: { md: '20%' },
        marginRight: { md: '5%' } 
      }}
      component="div"
    >
      <Box
        sx={{
          fontSize: { xs: '4vw', sm: '3vw', md: '1.5vw' }, 
          m: 1,
      fontFamily: '"Montserrat", sans-serif', 
    fontWeight: '600',  
    color: '#333',  
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)', 
    letterSpacing: '0.05em'
        }}
      >
        New Arrivals Only
      </Box>
  
      <Box
  sx={{
    fontSize: { xs: '6vw', sm: '5vw', md: '3.5vw' }, 
    m: 1,
    whiteSpace: 'pre-line',  
    lineHeight: 1.2, 
    fontFamily: '"Playfair Display", serif',
    fontWeight: '700', 
    textTransform: 'uppercase', 
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',  
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
    fontSize: { xs: '3vw', md: '1.5vh' }, 
    fontFamily: '"Comic Sans MS", "Comic Sans", cursive', 
    color: '#FF69B4', 
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', 
    letterSpacing: '0.05em', 
    fontWeight: 'bold', 
  }}
>
  Latest Collection
</Box>

        <EastIcon sx={{ marginLeft: 2, fontSize: { xs: '4vw', md: '2vh' } }} />  
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
import { Box, Button } from "@mui/material";
import { FC } from "react";
import heroPic from "../../Assets/hero_image.png";
import handPic from "../../Assets/hand_icon.png";
import EastIcon from '@mui/icons-material/East';

interface HeroProps {
    scroll: () => void;
}


export const Hero: FC<HeroProps> = ({ scroll }) => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: { xs: '110vh', sm: '90vh', md: '50vh' },
        background: 'linear-gradient(to right, #fc5c7d, #6a82fb)',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        paddingLeft: {lg:'20vw'},
        justifyContent: { xs: 'center', md: 'space-between', lg:'flex-start' },
        p: { xs: 2, md: 5 },
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: { xs: 'center', md: 'left' },
          width: { xs: '90%', md: '35%', lg: '30%' }, 
          maxWidth: '500px',
          ml: { md: '20%', lg: '10%' }, 
          mr: { md: '5%' },
        }}
        component="div"
      >
        <Box
          sx={{
            fontSize: { xs: '5vw', sm: '3vw', md: '1.5vw' },
            m: 1,
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: '600',
            color: '#333',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
            letterSpacing: '0.05em',
          }}
        >
          New Arrivals Only
        </Box>

        <Box
          sx={{
            fontSize: { xs: '8vw', sm: '4vw', md: '3.5vw', lg:'2.5vw' },
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

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent:{sm:'center', md:'flex-start'},
            alignItems: { xs: 'center', md: 'flex-start' },
            width: { xs: '100%', sm: 'auto' },
            mt: 2,
          }}
        >
          <Button
            onClick={() => scroll()}
            sx={{
              borderRadius: '20px',
              mt: 3,
              bgcolor: 'whitesmoke',
              width: { xs: '80%', sm: 'auto' },
           
            }}
            variant="contained"
          >
            <Box
              sx={{
                fontSize: { xs: '4vw', sm:'2vw', md: '1.5vh' },
                fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
                color: '#FF69B4',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                letterSpacing: '0.05em',
                fontWeight: 'bold',
              }}
            >
              Latest Collection
            </Box>
            <EastIcon sx={{ ml: 2, fontSize: { xs: '4vw', md: '2vh' } }} />
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 2, mt: { xs: 2, sm: 0 } }}>
            <img src={handPic} alt="hand icon" height={'40vh'} />
          </Box>
        </Box>
      </Box>

      <Box
        component="img"
        src={heroPic}
        alt="Hero"
        sx={{
          height: { xs: '40vh', sm: '50vh', md: '90%', lg: '80%' }, 
          width: 'auto',
          maxWidth: { xs: '90%', md: '100%' },
          objectFit: 'contain',
          mt: { xs: 4, md: 0 },
        }}
      />
    </Box>
  );
};
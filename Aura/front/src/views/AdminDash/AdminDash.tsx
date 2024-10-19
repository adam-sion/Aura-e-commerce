import { FC, useEffect, useRef, useState } from "react";
import { isAdmin } from "../../utils/roles";
import { Navigate } from "react-router-dom";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { categories } from "../../utils/data";
import "./AdminDash.css";
import CloseIcon from '@mui/icons-material/Close';
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';
import AddIcon from '@mui/icons-material/Add';
import beachBack from "../../Assets/categoriesBackground.png";
import { new_collections } from "../../data/new_collections";
export const AdminDash:FC = ()=> {
    const refs = useRef<(null | HTMLDivElement)[]>([]);
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const scrollToRef = (index: number) => {
        refs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };

      const handleScroll = () => {
        if (window.scrollY > 300) { 
          setShowScrollToTop(true);
        } else {
          setShowScrollToTop(false);
        }
      };
    
      const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    
      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    return !isAdmin()? <Navigate to="/"/>:(
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', 
          width: '100%',
          marginTop: '4vh',
     
        }}
      >
      <Box 
  sx={{ 
    width: '40%', 
    height: '40vh',
    position: 'relative',
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
         marginBottom:'7vh'
  }}
>
  <img 
    src={beachBack} 
    alt="Background" 
    style={{ 
      width: '100%', 
      height: '100%', 
      zIndex: -1,
      borderRadius: '20px'
    }} 
  />
   <Box sx={{ width: '95%',
   height:'80%', 
      position: 'absolute',  
      right: 0, 
      bottom: 0,
      left: '50%',
      top:'50%',
      transform: 'translate(-50%, -50%)'}}>
  <Grid 
    container 
    spacing={2} 
    sx={{ 
     height:'100%'
    }}
    alignItems={'center'}
  >
    {
      categories.map((category, index) => (
        <Grid item sm={4} xs={4} md={4} key={category.name} sx={{ height: '100%' }}>
          <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }} className="category-card">
    <img className="category-img" style={{ borderRadius: '20px' }}  src={category.pic} alt="" />

    <Button 
    onClick={()=> scrollToRef(index)}
    sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        color: 'white', 
        fontSize: '24px', 
        opacity: 0, 
        transition: 'opacity 0.3s ease', 
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        padding: '10px 20px', 
        borderRadius: '10px', 
        textAlign: 'center',
         
    }} 
    className="category-name"
>
    {category.name}
</Button>

</Box>

        </Grid>
      ))
    }
  </Grid>
 </Box>
</Box>


<Box sx={{marginTop:'4vh',  width: '40%'}}>

{
    categories.map((category,index)=> (
        <Box key={index} sx={{marginBottom:'15vh'}} ref={(el:HTMLDivElement|null) => (refs.current[index] = el)}>
<Typography sx={{fontFamily: '"Comic Sans MS", "Comic Sans", cursive'}} textAlign={'center'} variant="h3">{category.name}</Typography>
<Box sx={{display:'flex', justifyContent:'center', paddingTop:2}}>
<Divider
          sx={{
            borderBottomWidth: '0.3em',
            borderColor: 'lightBlue',
            width: '3em',
          }}
        />
        </Box>

<Grid sx={{marginTop:'1vh'}} container spacing={2}>
          <Grid item xs={3}>
            <Box sx={{ padding: 2, fontFamily: 'cursive' }}>Products</Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ padding: 2, fontFamily: 'cursive' }}>Title</Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ padding: 2, fontFamily: 'cursive' }}>Price</Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ padding: 2, fontFamily: 'cursive' }}>Remove</Box>
          </Grid>
        </Grid>

        <Divider
          sx={{
            borderBottomWidth: 2,
            borderColor: '#D4AF37',
            width: '100%',
          }}
        />


{/* products */}
{
    new_collections.filter((cat)=> cat.category === category.name.toLowerCase()).map((item, index)=> (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} width={'100%'} key={index}>
     <Grid sx={{marginTop:'1vh'}} container spacing={2}>
          <Grid item xs={3}>
            <Box sx={{ padding: 2, fontFamily: 'cursive' }}> <img height={'100%'} width={'100%'} src={item.image} alt={item.name} /></Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ padding: 2, fontFamily: 'cursive' }}>{item.name}</Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ padding: 2, fontFamily: 'cursive' }}>${item.price.toFixed(2)}</Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ padding: 2, fontFamily: 'cursive' }}>

            <Box
                  sx={{ padding: 2, fontFamily: 'cursive', cursor: 'pointer' }}
                  onClick={() => alert('remove')} 
                >
                  <CloseIcon />
                </Box>

            </Box>
          </Grid>
        </Grid>

        <Divider
          sx={{
            borderBottomWidth: 2,
            borderColor: '#D4AF37',
            width: '100%',
          }}
        />
     </Box>
    ))
    
}


        </Box>
    ))
}


        

</Box>

{showScrollToTop && (
        <Button
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            color: 'black',
            width:'50px',
            height:'2em',
            padding: '2em',
            borderRadius:'100%',
            boxShadow: 3,
            '&:hover': {
              backgroundColor: 'whiteSmoke',
            },
          }}
        >
        <SwitchAccessShortcutIcon sx={{fontSize:"3em"}}/>
        </Button>
      )}




<Button
          sx={{
            position: 'fixed',
            bottom: '10%',
            right: '5%',
            color: 'black',
            background: 'linear-gradient(130deg, red, white)',
            width:'6em',
            height:'6em',
            borderRadius:'100%',
            boxShadow: 3,
            '&:hover': {
              backgroundColor: 'whiteSmoke',
            },
          }}
        >
        <AddIcon sx={{fontSize:'4em'}}/>
        </Button>
      </Box>
      
    )
}
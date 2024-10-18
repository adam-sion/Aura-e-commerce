import { FC } from "react";
import { isAdmin } from "../../utils/roles";
import { Navigate } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { categories } from "../../utils/data";
import "./AdminDash.css";
import beachBack from "../../Assets/categoriesBackground.png";
export const AdminDash:FC = ()=> {
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
    width: '50%', 
    height: '40vh',
    position: 'relative',
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
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
      categories.map((category) => (
        <Grid item sm={4} xs={4} md={4} key={category.name} sx={{ height: '100%' }}>
          <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }} className="category-card">
    <img style={{ borderRadius: '20px' }} height={'90%'} width={'90%'} src={category.pic} alt="" />
    <Box 
        sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', // Center the text
            color: 'white', 
            fontSize: '24px', // Adjust font size as needed
            opacity: 0, // Start hidden
            transition: 'opacity 0.3s ease', // Smooth transition
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Optional: background for better readability
            padding: '10px 20px', // Optional: padding around text
            borderRadius: '10px', // Optional: rounded corners
            textAlign: 'center' // Center text
        }} 
        className="category-name"
    >
        {category.name}
    </Box>
</Box>

        </Grid>
      ))
    }
  </Grid>
 </Box>
</Box>



      </Box>
      
    )
}
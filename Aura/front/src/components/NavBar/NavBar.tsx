import { AppBar, Badge, Box, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import logo from "../../Assets/logo_big.png"
import { routes } from "../../Routes/Routes";
import { theme } from "../../themes/theme";
import {NavLink } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./NavBar.css"
import { useShoppingList } from "../../contexts/shoppingCartContext";
import { useAuth } from "../../contexts/AuthContext";


export const NavBar = () => {
  const {items} = useShoppingList();
  const {username, logout} = useAuth();

  return (
    <div style ={{ marginBottom:'25px', width:'100%'}}>
    <AppBar sx={{ bgcolor: theme.palette.primary.main, position:'static'}}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-around'}}>
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <img width={'50px'} height={'50px'} src={logo} alt="Logo" />
          <Typography variant="h4" component="div" sx={{ marginLeft: 2, fontFamily:'Arial, sans-serif', letterSpacing:4 }}>
            Aura
          </Typography>
        </div>
        <Stack direction="row" spacing={2} sx={{justifyContent:'center', gap:5}}>
          {routes.map((route) => (
            <NavLink
              key={route.name}
              to={route.path}
              style={{ color: theme.palette.secondary.main}}
              className={({ isActive }) => (isActive ? 'current' : 'link')}
            >
              {route.name}
            </NavLink>
          ))}
        </Stack>
        <Box display={'flex'} alignItems={'center'}>
          { 
          username  ? 
          <Box display={'flex'} gap={'2vh'} marginRight={'2vh'}>
            <Typography
          component={"div"}
          sx={{
            fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
            fontSize: '20px',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
          }}
        >
          Hi {username} !
        </Typography>
           <Button onClick={logout} variant="contained" sx={{borderRadius:20,fontFamily: 'monospace'}}>
           Logout
          </Button>
          </Box>
           :

        <NavLink to={'/login'} style={{color:'black', marginRight:'2vh'}}>
        <Button variant="contained" sx={{borderRadius:20,fontFamily: 'monospace'}}>
         Login
        </Button>
        </NavLink>
}

        <NavLink style={{color:'black'}} to={'/shoppingCart'}>
        <IconButton  color="inherit">
          <Badge badgeContent={items.reduce((acc, item)=> acc+item.quantity, 0)} color="secondary">
            <ShoppingCartIcon fontSize={"large"} />
          </Badge>
        </IconButton>
        </NavLink>
       
        </Box>
      </Toolbar>
    </AppBar>
    </div>
  );
};



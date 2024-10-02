import { AppBar, Badge, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import logo from "../Assets/logo_big.png"
import { routes } from "../Routes/Routes";
import { theme } from "../themes/theme";
import {NavLink } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./NavBar.css"
import { useShoppingList } from "../contexts/shoppingCartContext";

export const NavBar = () => {
  const {items} = useShoppingList();
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
        <IconButton color="inherit">
          <Badge badgeContent={items.length} color="secondary">
            <ShoppingCartIcon fontSize={"large"} />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
    </div>
  );
};



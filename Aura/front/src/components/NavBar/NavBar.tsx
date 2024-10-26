import { AppBar, Badge, Box, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import logo from "../../Assets/logo_big.png"
import { routes } from "../../Routes/Routes";
import { theme } from "../../themes/theme";
import {NavLink } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./NavBar.css"
import { useShoppingList } from "../../contexts/shoppingCartContext";
import { useAuth } from "../../contexts/AuthContext";
import { isAdmin } from "../../utils/roles";
import { Order } from "../../types/Order";


export const NavBar = () => {
  const { items } = useShoppingList();
  const { username, logout } = useAuth();

  return (
    <div style={{ marginBottom: '25px', width: '100%', }}>
      <AppBar sx={{ bgcolor: theme.palette.primary.main, position: 'static',  }}>
        <Toolbar sx={{ display: 'flex', flexDirection:{sm:'column', xs:'column', md:'row', lg:'md'}, justifyContent: {md:'space-between', lg:'space-between'}, flexWrap: 'wrap', gap:'2vh' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img width={'50px'} height={'50px'} src={logo} alt="Logo" />
            <Typography
              className="title-card"
              variant="h4"
              component="div"
              sx={{ marginLeft: 2, fontFamily: 'Arial, sans-serif', letterSpacing: 4 }}
            >
              {isAdmin() ? <span></span> : <></>}
              Aura
            </Typography>
          </div>
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', gap: { xs: 2, md: 5 } }}>
            {isAdmin() ? (
              <NavLink
                key={'adminDash'}
                to={"/adminDash"}
                style={{ color: theme.palette.secondary.main }}
                className={({ isActive }) => (isActive ? 'current' : 'link')}
              >
                {"Dash Board"}
              </NavLink>
            ) : (
              <></>
            )}
            {routes.map((route) => (
              <NavLink
                key={route.name}
                to={route.path}
                style={{ color: theme.palette.secondary.main }}
                className={({ isActive }) => (isActive ? 'current' : 'link')}
              >
                {route.name}
              </NavLink>
            ))}
          </Stack>
          <Box display={'flex'} alignItems={'center'} sx={{ flexWrap: 'wrap', gap: 2 }}>
            {username ? (
              <Box display={'flex'} gap={'2vh'} marginRight={'2vh'}>
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: 'Gill Sans, Verdana',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                    textAlign: 'center',
                  }}
                >
                  Hi {username} !
                </Typography>
                <Button onClick={logout} variant="contained" sx={{ borderRadius: 20, fontFamily: 'monospace', fontWeight: 'bold' }}>
                  Logout
                </Button>
              </Box>
            ) : (
              <NavLink to={'/login'} style={{ color: 'black', marginRight: '2vh' }}>
                <Button variant="contained" sx={{ borderRadius: 20, fontFamily: 'monospace', fontWeight: 'bold' }}>
                  Login
                </Button>
              </NavLink>
            )}

            <NavLink style={{ color: 'black' }} to={'/shoppingCart'}>
              <IconButton color="inherit">
                <Badge badgeContent={items.reduce((acc:number, item:Order) => acc + item.quantity, 0)} color="secondary">
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


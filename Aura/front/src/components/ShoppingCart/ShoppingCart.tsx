import { Box, Button, Divider, Grid } from "@mui/material";
import { FC } from "react";
import { useShoppingList } from "../../contexts/shoppingCartContext.tsx";
import Swal from 'sweetalert2';
import CloseIcon from '@mui/icons-material/Close';
import { Order } from "../../types/Order";
import { didUserSign } from "../../utils/roles.ts";
import { Navigate } from "react-router-dom";

export const ShoppingCart: FC = () => {
  const { items, removeItem, removeAll } = useShoppingList();

  return !didUserSign()? <Navigate to="/login"/> : (
    <>
 <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    width: '100%',
    marginTop: '4vh',
  }}
>
  <Grid container spacing={2} width={{ xs: '100%', md: '50%' }}>
    <Grid item xs={4} sm={1.5}>
      <Box sx={{ padding: { xs: 1, sm: 2 }, fontFamily: 'Gill Sans, Verdana' }}>Products</Box>
    </Grid>
    <Grid item xs={4} sm={3}>
      <Box sx={{ padding: { xs: 1, sm: 2 }, fontFamily: 'Gill Sans, Verdana'}}>Title</Box>
    </Grid>
    <Grid item xs={1.5} sm={1.5} display={{ xs: 'none', sm: 'block' }}>
      <Box sx={{ padding: { sm: 2 }, fontFamily: 'Gill Sans, Verdana'}}>Price</Box>
    </Grid>
    <Grid item xs={1.5} sm={1.5} display={{ xs: 'none', sm: 'block' }}>
      <Box sx={{ padding: { sm: 2 },fontFamily: 'Gill Sans, Verdana' }}>Quantity</Box>
    </Grid>
    <Grid item xs={1.5} sm={1.5} display={{ xs: 'none', sm: 'block' }}>
      <Box sx={{ padding: { sm: 2 }, fontFamily: 'Gill Sans, Verdana' }}>Size</Box>
    </Grid>
    <Grid item xs={2} sm={1.5}>
      <Box sx={{ padding: { xs: 1, sm: 2 }, fontFamily: 'Gill Sans, Verdana' }}>Total</Box>
    </Grid>
    <Grid item xs={2} sm={1.5}>
      <Box sx={{ padding: { xs: 1, sm: 2 }, fontFamily: 'Gill Sans, Verdana' }}>Remove</Box>
    </Grid>
  </Grid>

  <Divider
    sx={{
      borderBottomWidth: 2,
      borderColor: '#D4AF37',
      width: { xs: '100%', md: '50%' },
    }}
  />

  {items.map((item: Order, index: number) => (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} width={'100%'} key={index}>
      <Grid container spacing={2} width={{ xs: '100%', md: '50%' }}>
        <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={4} sm={1.5}>
          <Box sx={{ padding: { xs: 1, sm: 2 }, fontFamily: 'cursive' }}>
            <img height={'100%'} width={'100%'} src={item.img} alt={item.name} />
          </Box>
        </Grid>
        <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={4} sm={3}>
          <Box sx={{ padding: { xs: 1, sm: 2 },fontFamily: 'Gill Sans, Verdana' }}>{item.name}</Box>
        </Grid>
        <Grid  item xs={1.5} sm={1.5} display={{ xs: 'none', sm: 'flex' }} alignItems={'center'} justifyContent={'center'}>
          <Box sx={{ padding: { sm: 2 },fontFamily: 'Gill Sans, Verdana' }}>${item.price.toFixed(2)}</Box>
        </Grid>
        <Grid  item xs={1.5} sm={1.5} display={{ xs: 'none', sm: 'flex' }} alignItems={'center'} justifyContent={'center'}>
          <Box sx={{ padding: { sm: 2 }, fontFamily: 'Gill Sans, Verdana' }}>{item.quantity}</Box>
        </Grid>
        <Grid  item xs={1.5} sm={1.5} display={{ xs: 'none', sm: 'flex' }} alignItems={'center'} justifyContent={'center'}>
          <Box sx={{ padding: { sm: 2 }, fontFamily: 'Gill Sans, Verdana' }}>{item.size}</Box>
        </Grid>
        <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={2} sm={1.5}>
          <Box sx={{ padding: { xs: 1, sm: 2 }, fontFamily: 'Gill Sans, Verdana' }}>${(item.price * item.quantity).toFixed(2)}</Box>
        </Grid>
        <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent:'center' }} item xs={2} sm={1.5}>
          <Box
            sx={{ padding: { xs: 1, sm: 2 }, fontFamily: 'Gill Sans, Verdana', cursor: 'pointer' }}
            onClick={() => removeItem(item)}
          >
            <CloseIcon />
          </Box>
        </Grid>
      </Grid>

      <Divider
        sx={{
          borderBottomWidth: 2,
          borderColor: '#D4AF37',
          width: { xs: '100%', md: '50%' },
        }}
      />
    </Box>
  ))}
  
  {items.length > 0 && (
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#f44336',
        color: 'white',
        borderRadius: 20,
        padding: { xs: '8px 16px', md: '10px 20px' },
        fontSize: { xs: '14px', md: '18px' },
        fontWeight: 'bold',
        boxShadow: 3,
        marginTop: '7vh',
        marginBottom: '5vh',
        '&:hover': {
          backgroundColor: '#d32f2f',
          boxShadow: 6,
        },
      }}
      onClick={() => {
        removeAll();
        Swal.fire({
          title: 'Success!',
          text: 'Your purchase was successful.',
          icon: 'success',
          confirmButtonText: 'Okay',
        });
      }}
    >
      Purchase
    </Button>
  )}
</Box>


    </>
  );
};

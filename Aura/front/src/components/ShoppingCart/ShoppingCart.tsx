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
        {/* Header */}
        <Grid container spacing={2} width="50%">
          <Grid item xs={1.5}>
            <Box sx={{ padding: 2, fontFamily: 'cursive' }}>Products</Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ padding: 2, fontFamily: 'cursive' }}>Title</Box>
          </Grid>
          <Grid item xs={1.5}>
            <Box sx={{ padding: 2, fontFamily: 'cursive' }}>Price</Box>
          </Grid>
          <Grid item xs={1.5}>
            <Box sx={{ padding: 2, fontFamily: 'cursive' }}>Quantity</Box>
          </Grid>
          <Grid item xs={1.5}>
            <Box sx={{ padding: 2, fontFamily: 'cursive' }}>Size</Box> {/* New Size Column */}
          </Grid>
          <Grid item xs={1.5}>
            <Box sx={{ padding: 2, fontFamily: 'cursive' }}>Total</Box>
          </Grid>
          <Grid item xs={1.5}>
            <Box sx={{ padding: 2, fontFamily: 'cursive' }}>Remove</Box>
          </Grid>
        </Grid>

        <Divider
          sx={{
            borderBottomWidth: 2,
            borderColor: '#D4AF37',
            width: '50%',
          }}
        />

        {/* Items List */}
        {items.map((item: Order, index: number) => (
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'} width={'100%'} key={index}>
            <Grid container spacing={2} width="50%">
              <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={1.5}>
                <Box sx={{ padding: 2, fontFamily: 'cursive' }}>
                  <img height={'100%'} width={'100%'} src={item.image} alt={item.name} />
                </Box>
              </Grid>
              <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={3}>
                <Box sx={{ padding: 2, fontFamily: 'cursive' }}>{item.name}</Box>
              </Grid>
              <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={1.5}>
                <Box sx={{ padding: 2, fontFamily: 'cursive' }}>${item.price.toFixed(2)}</Box>
              </Grid>
              <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={1.5}>
                <Box sx={{ padding: 2, fontFamily: 'cursive' }}>{item.quantity}</Box>
              </Grid>
              <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={1.5}>
                <Box sx={{ padding: 2, fontFamily: 'cursive' }}>{item.size}</Box> {/* Display Size */}
              </Grid>
              <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={1.5}>
                <Box sx={{ padding: 2, fontFamily: 'cursive' }}>${(item.price * item.quantity).toFixed(2)}</Box>
              </Grid>
              <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={1.5}>
                <Box
                  sx={{ padding: 2, fontFamily: 'cursive', cursor: 'pointer' }}
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
                width: '50%',
              }}
            />
          </Box>
        ))}

        {items.length > 0 ? (
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
        ) : <></>}
      </Box>
    </>
  );
};

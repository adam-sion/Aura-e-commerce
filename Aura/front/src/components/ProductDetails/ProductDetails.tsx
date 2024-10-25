
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MuiBreadcrum } from "../MuiBreadcrum/MuiBreadcrum";
import { Product } from "../../types/Product";
import { Box, Button, ButtonGroup, Divider, Typography } from "@mui/material";
import './ProductDetails.css';
import { Order } from "../../types/Order.ts";
import { useShoppingList } from "../../contexts/shoppingCartContext.tsx";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


export const ProductDetails: FC = () => {
    const [product, setProduct] = useState<Product | undefined>();
    const { addItem } = useShoppingList();
    const [order, setOrder] = useState<Order | undefined>();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1); 
  
    const handleSizeSelection = (sizeObj: any) => {
        setSelectedSize(sizeObj.size); 
        setOrder({ ...product!, size: sizeObj.size, quantity }); 
    };
  
    const handleAddItem = (order: Order) => {
        if (order === undefined || !selectedSize) {
            toast.error("You have to select a size");
        } else {
            addItem(order);
            toast.success("Item added to your cart");
        }
    };
  
    const handleQuantityChange = (increment: boolean) => {
      const newQuantity = increment ? quantity + 1 : Math.max(1, quantity - 1);
  
        setQuantity(newQuantity);
        if (order) setOrder({ ...order, quantity: newQuantity }); 
    };
  
    const sizes: Pick<Order, 'size'>[] = [{ size: 'XS' }, { size: 'S' }, { size: 'M' }, { size: 'L' }, { size: 'XL' }];
  
    const { productId } = useParams();
    const api = axios.create({ baseURL: `http://localhost:4000/api/product/${productId}` });
  
    useEffect(() => {
      (async () => {
        const { data } = await api.get('');
        setProduct(data);
      })();
    }, []);
  
    return (
      <div style={{ marginLeft: '2vw' }}>
        <MuiBreadcrum product={product} />
        <Box
          sx={{
            width: { xs: '90vw', md: '70vw' },
            height: { xs: 'auto', sm: 'auto', md: '75vh' },
            display: 'flex',
            backgroundImage: 'linear-gradient(to left, lightblue, white)',
            flexDirection: { xs: 'column', sm: 'row' },
            p: { xs: 2, md: 5 },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '50%' }, height: '100%', display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ display: "flex", flexDirection: 'column', width: "20%", height: '100%', marginRight: '1vw' }}>
              <img style={{ marginBottom: '10%' }} height={'20%'} src={product?.img} alt="" />
              <img style={{ marginBottom: '10%' }} height={'20%'} src={product?.img} alt="" />
              <img style={{ marginBottom: '10%' }} height={'20%'} src={product?.img} alt="" />
              <img height={'20%'} src={product?.img} alt="" />  
            </Box>
  
            <Box sx={{ display: "flex", flexDirection: 'column', width: "80%", height: '100%', backgroundColor: 'white' }}>
              <img height={'100%'} src={product?.img} alt="" />
            </Box>
          </Box>
  
          <Box sx={{ width: { xs: '100%', sm: '40%' }, height: '100%', marginLeft: { xs: 0, sm: '2vw' } }}>
            <Typography
              sx={{
                fontSize: { xs: '2rem', md: '4vh' },
                fontFamily: 'Georgia, Times New Roman, serif',
                fontWeight: 'bold',
              }}
            >
              {product?.name}
            </Typography>
  
            <Typography
              sx={{
                fontSize: { xs: '2rem', md: '4vh' },
                fontFamily: 'Georgia, Times New Roman, serif',
                fontWeight: 'bold',
                marginTop: '2vh',
                color: '#FF4D4D',
                marginLeft: '1vw',
              }}
            >
              ${product?.price.toFixed(2)}
            </Typography>
  
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                p: { xs: 2, md: 4 },
              }}
            >
              <Divider
                sx={{
                  width: '100%',
                  borderBottomWidth: '1px',
                  borderColor: 'black',
                  mt: 2,
                  mb: 4,
                }}
              />
  
              {/* Select size */}
              <Typography
                sx={{ fontFamily: 'Georgia, Times New Roman, serif', marginBottom: '2vh', fontSize: { xs: '1.5rem', md: '2rem' } }}
                variant="h3"
              >
                Select size:
              </Typography>
  
              <ButtonGroup sx={{ gap: 2, marginTop: '2vh' }} aria-label="size selection">
                {sizes.map((sizeObj) => (
                  <Button
                    key={sizeObj.size}
                    onClick={() => handleSizeSelection(sizeObj)}
                    sx={{
                      width: { xs: '30px', md: '50px' },
                      height: { xs: '30px', md: '50px' },
                      borderRadius: 0,
                      backgroundColor: selectedSize === sizeObj.size ? 'white' : 'black',
                      color: selectedSize === sizeObj.size ? 'black' : 'white',
                      border: selectedSize === sizeObj.size ? '2px solid black' : 'none',
                      '&:hover': {
                        backgroundColor: selectedSize === sizeObj.size ? '#f5f5f5' : '#333',
                      },
                    }}
                  >
                    {sizeObj.size}
                  </Button>
                ))}
              </ButtonGroup>
  
              {/* Quantity Buttons */}
              <Typography sx={{ fontFamily: 'Georgia, Times New Roman, serif', marginTop: '2vh', fontSize: { xs: '1.5rem', md: '1.5rem' } }}>
                Quantity:
              </Typography>
              <ButtonGroup sx={{ marginTop: '2vh', gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => handleQuantityChange(false)}
                  sx={{ width: { xs: '30px', md: '40px' }, height: { xs: '30px', md: '40px' } }}
                >
                  -
                </Button>
                <Button variant="contained" sx={{ width: { xs: '40px', md: '50px' } }}>{quantity}</Button>
                <Button
                  variant="contained"
                  onClick={() => handleQuantityChange(true)}
                  sx={{ width: { xs: '30px', md: '40px' }, height: { xs: '30px', md: '40px' } }}
                >
                  +
                </Button>
              </ButtonGroup>
  
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  borderRadius: 20,
                  padding: { xs: '8px 16px', md: '10px 20px' },
                  fontSize: { xs: '14px', md: '16px' },
                  fontWeight: 'bold',
                  boxShadow: 3,
                  marginTop: '7vh',
                  '&:hover': {
                    backgroundColor: '#d32f2f',
                    boxShadow: 6,
                  },
                }}
                onClick={() => handleAddItem(order!)}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    );
  };
  

import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MuiBreadcrum } from "../MuiBreadcrum/MuiBreadcrum";
import { Product } from "../../types/Product";
import all_product from "../../data/all_product.ts";
import { Box, Button, ButtonGroup, Divider, Typography } from "@mui/material";
import './ProductDetails.css';
import { Order } from "../../types/Order.ts";
import { useShoppingList } from "../../contexts/shoppingCartContext.tsx";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const ProductDetails: FC = () => {
  const [product, setProduct] = useState<Product | undefined>();
  const { addItem } = useShoppingList();
  const [order, setOrder] = useState<Order | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // New state for quantity

  // Function to handle size selection
  const handleSizeSelection = (sizeObj: any) => {
      setSelectedSize(sizeObj.size); // Set the selected size
      setOrder({ ...product!!, size: sizeObj.size, quantity }); // Update the order with selected size and quantity
  };

  // Function to handle adding the item to cart
  const handleAddItem = (order: Order) => {
      if (order === undefined || !selectedSize) {
          toast.error("You have to select a size");
      } else {
          addItem(order);
          toast.success("Item added to your cart");
      }
  };

  // Increase or decrease quantity
  const handleQuantityChange = (increment: boolean) => {
      setQuantity((prevQuantity) =>
          increment ? prevQuantity + 1 : Math.max(1, prevQuantity - 1) // Ensure quantity is at least 1
      );
      if (order) setOrder({ ...order, quantity }); // Update the order with new quantity
  };

  const sizes: Pick<Order, 'size'>[] = [{ size: 'XS' }, { size: 'S' }, { size: 'M' }, { size: 'L' }, { size: 'XL' }];

  const { productId } = useParams();

  useEffect(() => {
      const foundProduct = all_product.find((item) => item.id === Number(productId));
      setProduct(foundProduct);
  }, []);

  return (
      <div style={{ marginLeft: '2vw' }}>
          <MuiBreadcrum product={product} />
          <Box
              sx={{
                  width: '70vw',
                  height: { xs: '150vh', sm: '400vh', md: '75vh' },
                  display: 'flex',
                  backgroundImage: 'linear-gradient(to left, lightblue, white)',
                  flexDirection: 'row',
                  p: { xs: 2, md: 5 },
              }}
          >
              <Box sx={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'row' }}>
                  <Box sx={{ display: "flex", flexDirection: 'column', width: "20%", height: '100%', marginRight: '1vw' }}>
                      <img style={{ marginBottom: '25%', marginTop: '25%' }} height={'20%'} src={product?.image} alt="" />
                      <img style={{ marginBottom: '25%' }} height={'20%'} src={product?.image} alt="" />
                      <img style={{ marginBottom: '25%' }} height={'20%'} src={product?.image} alt="" />
                      <img height={'20%'} src={product?.image} alt="" />
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: 'column', width: "80%", height: '100%', backgroundColor: 'purple' }}>
                      <img height={'100%'} src={product?.image} alt="" />
                  </Box>
              </Box>

              <Box sx={{ width: '40%', height: '100%', marginLeft: '2vw' }}>
                  <Typography
                      sx={{
                          fontSize: { md: '5vh', s: '2vh', xs: '2vh' },
                          fontFamily: 'Georgia, Times New Roman, serif',
                          fontWeight: 'bold',
                      }}
                  >
                      {product?.name}
                  </Typography>

                  <Typography
                      sx={{
                          fontSize: '4vh',
                          fontFamily: 'Georgia, Times New Roman, serif',
                          fontWeight: 'bold',
                          marginTop: '2vh',
                          color: '#FF4D4D',
                          marginLeft: '1vw',
                      }}
                  >
                      ${product?.price}
                  </Typography>

                  <Box
                      sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          flexDirection: { xs: 'column', md: 'column' },
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
                                      width: { xs: 40, md: 50 },
                                      height: { xs: 40, md: 50 },
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
                      <Typography sx={{ fontFamily: 'Georgia, Times New Roman, serif', marginTop: '2vh', fontSize: '1.5rem' }}>
                          Quantity:
                      </Typography>
                      <ButtonGroup sx={{ marginTop: '2vh', gap: 2 }}>
                          <Button
                              variant="contained"
                              onClick={() => handleQuantityChange(false)}
                          >
                              -
                          </Button>
                          <Button variant="contained">{quantity}</Button>
                          <Button
                              variant="contained"
                              onClick={() => handleQuantityChange(true)}
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
                          onClick={() => handleAddItem(order!!)}
                      >
                          Add to Cart
                      </Button>
                  </Box>
              </Box>
          </Box>
      </div>
  );
};
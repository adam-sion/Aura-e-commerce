import { FC, useRef } from "react";
import { Product } from "../../types/Product";
import { Box, Button, Divider, Typography } from "@mui/material";
import kid from "../../Assets/kid.png"
import man from "../../Assets/man.png"
import woman from "../../Assets/woman.png"

import EastIcon from '@mui/icons-material/East';
import { Gallery } from "../Gallery/Gallery";

import { useFetchCategoryProducts } from "../../api/hooks/useFetchCategoryProducts.tsx";


interface CategoryProps {
    category: Product["category"]
}

export const Category: FC<CategoryProps> = ({ category }) => {
  const uniqueColor = category === 'kids' ? 'green' : category === 'men' ? 'blue' : 'purple';
  const [categoryProducts] = useFetchCategoryProducts(category);
  const sectionRef = useRef<null | HTMLDivElement>(null);

  const scroll = () => {
      if (sectionRef.current) {
          sectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
  };

  return (
      <>
          <Box
              sx={{
                  width: '100vw',
                  height: { xs: '110vh', sm: '90vh', md: '50vh' },
                  background: {md: `linear-gradient(80deg, white 0%, ${uniqueColor} 100%)`, sm: `linear-gradient(100deg, white 0%, ${uniqueColor} 100%)`
                  , xs:  `linear-gradient(100deg, white 0%, ${uniqueColor} 100%)`},
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: { xs: 2, md: 5 },
                  overflow: 'hidden',
              }}
          >
              <Typography
                  sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: { xs: 'center', md: 'left' },
                      width: { xs: '100%', md: '50%' },
                      ml: { md: '15%' },
                      mr: { md: category === woman ? '5%' : '0' },
                  }}
                  component="div"
              >
                  <Box
                      sx={{
                          fontSize: { xs: '14vw', sm: '10vw', md: '4vw' },
                          m: 1,
                          color: uniqueColor,
                          fontFamily: 'Gill Sans, Verdana',
                          fontWeight: 'bold',
                          textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                      }}
                  >
                      FLAT 50% OFF
                  </Box>

                  <Box
                      sx={{
                          fontSize: { xs: '6vw', sm: '5vw', md: '3.5vw' },
                          m: 1,
                          color: 'white',
                          fontFamily: '"Poppins", sans-serif',
                          fontWeight: 'bold',
                      }}
                  >
                      special{" "}
                      <Box component="span" sx={{ color: uniqueColor }}>
                          {category}
                      </Box>{" "}
                      collection
                  </Box>

                  <Box sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'center', md: 'flex-start' },
                      justifyContent: {xs:'center'},
                      width: { xs: '100%', sm: 'auto' },
                      mt: 2,
                  }}>
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
                                  fontSize: { xs: '4vw', md: '1.5vh' },
                                  fontFamily: 'Gill Sans, Verdana',
                                  color: '#FF69B4',
                                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                                  letterSpacing: '0.05em',
                                  fontWeight: 'bold',
                              }}
                          >
                              OUR Collection
                          </Box>
                          <EastIcon sx={{ ml: 2, fontSize: { xs: '4vw', md: '2vh' } }} />
                      </Button>
                  </Box>
              </Typography>

              <Box
                  component="img"
                  src={category === 'kids' ? kid : category === 'men' ? man : woman}
                  alt={`${category} collection`}
                  sx={{
                      height: { xs: '40vh', sm: '50vh', md: '90%' },
                      width: 'auto',
                      maxWidth: { xs: '80vw', md: '30vw' },
                      mt: { xs: 4, md: 0 },
                      objectFit: 'contain',
                  }}
              />
          </Box>

          <div ref={sectionRef} style={{ marginTop: '10vh' }}>
              <Divider
                  sx={{
                      borderBottomWidth: '10px',
                      borderColor: 'black',
                      fontWeight: 'fontWeightMedium',
                      mb: 4,
                  }}
              >
                  <Typography variant="h3" sx={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}>
                      Our Collection
                  </Typography>
              </Divider>
              <Box sx={{ marginLeft: '5vw' }}>
                  <Gallery products={categoryProducts}></Gallery>
              </Box>
          </div>
      </>
  );
};
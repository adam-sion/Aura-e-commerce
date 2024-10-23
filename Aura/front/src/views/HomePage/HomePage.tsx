

import { FC, useEffect, useRef } from "react"
import { Hero } from "../../components/Hero/Hero.tsx"
import { Box, Divider, Typography } from "@mui/material";
import { Gallery } from "../../components/Gallery/Gallery.tsx";
import { useFetchSaleProducts } from "../../api/hooks/useFetchSaleProducs.tsx";


export const HomePage:FC = ()=> {
   const [saleProducts] = useFetchSaleProducts();
    const sectionRef = useRef<null | HTMLDivElement>(null);


    const scrollToSection = () => {
        if (sectionRef.current) {
          sectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
      };
       return (<>
      <Hero scroll={scrollToSection}/> 
      <div ref={sectionRef} style={{marginTop:'10vh'}}>
      <Divider
  sx={{
    borderBottomWidth: '10px',  
    borderColor: 'black', 
    fontWeight: 'fontWeightMedium',
    mb: 4,
  }}
>
  <Typography variant="h3" sx={{fontFamily: '"Comic Sans MS", "Comic Sans", cursive'}}>Latest Collection</Typography>
</Divider>
<Box sx={{marginLeft:'5vw'}}>
<Gallery products={saleProducts}></Gallery>
</Box>
</div>
    </>)

}
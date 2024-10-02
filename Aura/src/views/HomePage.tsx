

import { FC, useRef } from "react"
import { Hero } from "../components/Hero"
import { Box, Divider, Grid, Typography } from "@mui/material";
import {new_collections} from "../data/new_collections.ts"
export const HomePage:FC = ()=> {

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
    borderBottomWidth: '10px',  // This controls the thickness of the Divider
    borderColor: 'black',  // Optional: Set the color of the Divider
    fontWeight: 'fontWeightMedium',
    mb: 4, // Optional: Add margin below the Divider
  }}
>
  <Typography variant="h3">Latest Collection</Typography>
</Divider>

<Grid  container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 10, md: 16 }}>
  {new_collections.map((item) => (
    <Grid item xs={2} sm={4} md={4} key={item.id}>
      <img src={item.image} alt="" />
      <div style={{maxWidth:'350px'}}><Typography variant="h6">{item.name}</Typography>
      <Typography variant="h5">$<Box component="span" fontWeight='fontWeightMedium'>{item.price}</Box></Typography>
      </div>
    </Grid>
  ))}
</Grid>
</div>
    </>)

}
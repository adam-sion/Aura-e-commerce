import { FC } from "react"
import { Product } from "../../types/Product"
import { Box, Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom"

interface GalleryProps {
products: Product[]
}

export const Gallery:FC<GalleryProps> = ({products})=> {
    return (
<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 10, md: 16 }}>
  {Array.isArray(products)? products.map((item) => (
    <Grid display={'flex'} flexDirection={'column'} item xs={2} sm={4} md={3} key={item.id}>
      <Link style={{marginTop:'auto', marginBottom:'auto'}} to={`/product/${item.id}`}><Box
        component="img"
        src={item.img}
        alt=""
        sx={{
          width: '100%',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      />
      </Link>
      <div style={{ maxWidth: '350px', marginTop:4 }}>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="h5">
          $<Box component="span" fontWeight="fontWeightMedium">{item.price.toFixed(2)}</Box>
        </Typography>
      </div>
    </Grid>
  )):null}
</Grid>

    )
}
import { Box, Breadcrumbs } from "@mui/material"
import { FC } from "react"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { Link } from "react-router-dom"
import { Product } from "../../types/Product"
import "./MuiBreadcrum.css"
interface breadcrumProps {
    product: Product|undefined
}

export const MuiBreadcrum:FC<breadcrumProps> = ({product})=> {
    return (
        <Box m={2}>
<Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small"/>}>
<Link className="bread-link" to={"/"}>Home</Link>
<Link className="bread-link" to={`/${product?.category}`}>{product?.category}</Link>
<Link className="bread-link" to={`/product/${product?.id}`}>{product?.name}</Link>
</Breadcrumbs>
        </Box>
    )
}

import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MuiBreadcrum } from "../MuiBreadcrum/MuiBreadcrum";
import { Product } from "../../types/Product";
import all_product from "../../data/all_product";

export const ProductDetails:FC = ()=> {
    const [product, setProduct] = useState<Product|undefined>();
    const {productId} = useParams();

    useEffect(()=> {
     const foundProduct = all_product.find((item)=> item.id === Number(productId))
     setProduct(foundProduct);
    },[])
return (
    <>
    <MuiBreadcrum product={product} />
    </>
)
}
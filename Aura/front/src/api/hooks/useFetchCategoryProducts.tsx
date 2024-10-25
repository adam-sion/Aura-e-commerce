import axios from "axios";
import { Product } from "../../types/Product";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


export const useFetchCategoryProducts = (category:Product["category"]):[Product[], ()=> Promise<void>]=> {

const api = axios.create({baseURL:`${import.meta.env.VITE_API_URL}/api/products/category/${category}`});
const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);


const fetchCategoryProducts = async ()=> {
        try {
         const {data} = await api.get('');
        setCategoryProducts(data);
        } catch (error:any){
            Swal.fire({
                title: 'Failed',
                text: "can't load products",
                icon: 'error',
                confirmButtonText: 'Okay',
            });
        }
    }

        useEffect( ()=> {
            fetchCategoryProducts();
            return () => {
              };
        },[category]);
        
        return [categoryProducts, fetchCategoryProducts];
        }


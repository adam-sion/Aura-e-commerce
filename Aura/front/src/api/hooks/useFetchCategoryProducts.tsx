import axios from "axios";
import { Product } from "../../types/Product";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLoading } from "../../contexts/loadingContext";


export const useFetchCategoryProducts = (category:Product["category"]):[Product[], ()=> Promise<void>]=> {

const api = axios.create({baseURL:`${import.meta.env.VITE_API_URL}/api/products/category/${category}`});
const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
const {setIsLoading} = useLoading();

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
            setIsLoading(true);
            fetchCategoryProducts();
            setIsLoading(false);
            return () => {
              };
        },[category]);
        
        return [categoryProducts, fetchCategoryProducts];
        }


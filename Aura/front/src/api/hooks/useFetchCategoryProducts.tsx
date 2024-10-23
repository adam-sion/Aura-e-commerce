import axios from "axios";
import { Product } from "../../types/Product";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLoading } from "../../contexts/loadingContext";

export const useFetchCategoryProducts = (category:Product["category"]):[Product[], ()=> Promise<void>]=> {

const api = axios.create({baseURL:`http://localhost:4000/api/products/category/${category}`});
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
            fetchCategoryProducts();
            return () => {
              };
        },[category]);
        
        return [categoryProducts, fetchCategoryProducts];
        }


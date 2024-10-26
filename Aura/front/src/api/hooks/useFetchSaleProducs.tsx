import axios from "axios";
import { Product } from "../../types/Product";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLoading } from "../../contexts/loadingContext";

export const useFetchSaleProducts = (): [Product[], ()=> Promise<void>]=> {

const api = axios.create({baseURL:`${import.meta.env.VITE_API_URL}/api/products/sale`});
const [saleProducts, setSaleProducts] = useState<Product[]>([]);
const {setIsLoading} = useLoading();


const fetchSaleProducts = async ()=> {
        try {
         const {data} = await api.get('');
         setIsLoading(true);
        setSaleProducts(data);
        } catch (error:any){
            Swal.fire({
                title: 'Failed',
                text: "can't load products",
                icon: 'error',
                confirmButtonText: 'Okay',
            });
        }finally {
            setIsLoading(false);
        }}

        useEffect( ()=> {
             fetchSaleProducts();

            return () => {
              };
        }, []);
        
        return [saleProducts, fetchSaleProducts];
        }


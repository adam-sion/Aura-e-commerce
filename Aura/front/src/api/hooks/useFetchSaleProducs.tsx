import axios from "axios";
import { Product } from "../../types/Product";
import { SetStateAction, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLoading } from "../../contexts/loadingContext";

export const useFetchSaleProducts = (): [Product[], ()=> Promise<void>]=> {

const api = axios.create({baseURL:`http://localhost:4000/api/products/sale`});
const [saleProducts, setSaleProducts] = useState<Product[]>([]);
const {setIsLoading} = useLoading();

const fetchSaleProducts = async ()=> {
        try {
         const {data} = await api.get('');
        setSaleProducts(data);
        } catch (error:any){
            Swal.fire({
                title: 'Failed',
                text: "can't load products",
                icon: 'error',
                confirmButtonText: 'Okay',
            });
        }}

        useEffect( ()=> {
             fetchSaleProducts();

            return () => {
              };
        }, []);
        
        return [saleProducts, fetchSaleProducts];
        }



import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useNavigateUser = ()=> {
const navigate = useNavigate();
useEffect(()=> {
if (localStorage.getItem('userData')) {
   navigate("/")
}
}, [])
}
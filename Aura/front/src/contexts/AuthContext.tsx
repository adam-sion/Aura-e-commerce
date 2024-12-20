import { createContext, FC, ReactNode, useContext, useState } from "react";
import { User } from "../types/User";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { isAdmin } from "../utils/roles";
import { useLoading } from "./loadingContext";
import Swal from "sweetalert2";



interface AuthContextType {
    login: (user:User)=> Promise<boolean>,
    logout: ()=> void,
    username:string|null
}

const AuthContext = createContext<AuthContextType|undefined>(undefined);

const AuthProvider:FC<{children:ReactNode}> = ({children}) => {

const navigate = useNavigate();
const {setIsLoading} = useLoading();

const [username, setUsername] = useState<string | null>(() => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData).username || null : null;
  });
  

const login = async(user:User):Promise<boolean>=> {
    const api = axios.create({
        baseURL:`${import.meta.env.VITE_API_URL}/auth/signin`
       })

  try {
    setIsLoading(true);

   const {data} = await api.post('',user);
   localStorage.setItem('userData', JSON.stringify({username:data.username, token:data.token}));
   setUsername(data.username);
   navigate(isAdmin()? "/adminDash":"/");
   setIsLoading(false);
   return true;
  } catch (error:any) {
    setIsLoading(false);
    return false;
  }
 }

 const logout = ()=> {
    localStorage.removeItem('userData');
    setUsername(null);
    navigate("/");
    Swal.fire({
      title: 'Success',
      text: "You have logged out",
      icon: 'success',
      confirmButtonText: 'Okay',
  });
 }

 return (
    <AuthContext.Provider value={{login, logout, username}}>
    {children}
    </AuthContext.Provider>
 )
}


const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };

  export {AuthProvider, useAuth};
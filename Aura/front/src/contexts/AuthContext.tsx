import { createContext, FC, ReactNode, useContext, useState } from "react";
import { User } from "../types/User";
import { useNavigate } from "react-router-dom";
import axios from "axios";



interface AuthContextType {
    login: (user:User)=> Promise<boolean>,
    logout: ()=> void,
    username:string|null
}

const AuthContext = createContext<AuthContextType|undefined>(undefined);

const AuthProvider:FC<{children:ReactNode}> = ({children}) => {

const navigate = useNavigate();

const [username, setUsername] = useState<string | null>(() => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData).username || null : null;
  });
  

const login = async(user:User):Promise<boolean>=> {
    const api = axios.create({
        baseURL:'http://localhost:4000/auth/signin'
       })

  try {
   const {data} = await api.post('',user);
   localStorage.setItem('userData', JSON.stringify({username:data.username, token:data.token}));
   setUsername(data.username);
   navigate("/");
   return true;
  } catch (error:any) {
    return false;
  }
 }

 const logout = ()=> {
    localStorage.removeItem('userData');
    setUsername(null);
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
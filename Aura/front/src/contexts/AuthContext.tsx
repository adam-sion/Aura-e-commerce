import { createContext, FC, ReactNode, useContext, useState } from "react";
import { User } from "../types/User";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface userWitoutPassword {
    username:string,
    id:string
}

interface AuthContextType {
    login: (user:User)=> Promise<boolean>,
    logout: ()=> void,
    user:userWitoutPassword|null
}

const AuthContext = createContext<AuthContextType|undefined>(undefined);

const AuthProvider:FC<{children:ReactNode}> = ({children}) => {

const navigate = useNavigate();

const [user, setUser] = useState<userWitoutPassword | null>(() => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData).user || null : null;
  });
  

const login = async(user:User):Promise<boolean>=> {
    const api = axios.create({
        baseURL:'http://localhost:4000/auth/signin'
       })

  try {
   const {data} = await api.post('',user);
   localStorage.setItem('userData', JSON.stringify({user:data.userWithoutPassword, token:data.token}));
   setUser(data.userWithoutPassword);
   navigate("/");
   return true;
  } catch (error:any) {
    return false;
  }
 }

 const logout = ()=> {
    localStorage.removeItem('userData');
    setUser(null);
 }

 return (
    <AuthContext.Provider value={{login, logout, user}}>
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

import './App.css'
import { Outlet } from 'react-router-dom'
import { NavBar } from './components/NavBar/NavBar'
import { theme } from './themes/theme'
import { ThemeProvider } from '@mui/material'
import { ShoppingListProvider } from './contexts/ShoppingCartContext'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext'
import { LoadingProvider } from './contexts/loadingContext'

function App() {
  return (
    <>
     <ThemeProvider theme={theme}>
      <LoadingProvider>
      <AuthProvider>
     <ShoppingListProvider>
      <div style ={{  overflowX: 'hidden'}}>
      <NavBar/>
      <Outlet/>
      </div>
  
     </ShoppingListProvider> 
     </AuthProvider>
     </LoadingProvider>
     </ThemeProvider>
     <ToastContainer position='bottom-right' limit={2} autoClose={1500}/>
    </>
  )
}

export default App


import './App.css'
import { Outlet } from 'react-router-dom'
import { NavBar } from './components/NavBar/NavBar'
import { theme } from './themes/theme'
import { ThemeProvider } from '@mui/material'
import { ShoppingListProvider } from './contexts/shoppingCartContext'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
     <ThemeProvider theme={theme}>
     <ShoppingListProvider>
      <div style ={{  overflowX: 'hidden'}}>
      <NavBar/>
      <Outlet/>
      </div>
  
     </ShoppingListProvider> 
     </ThemeProvider>
     <ToastContainer position='bottom-right' limit={2} autoClose={1500}/>
    </>
  )
}

export default App

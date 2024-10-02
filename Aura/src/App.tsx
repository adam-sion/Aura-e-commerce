
import './App.css'
import { Outlet } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { theme } from './themes/theme'
import { ThemeProvider } from '@mui/material'
import { ShoppingListProvider } from './contexts/shoppingCartContext'


function App() {
  return (
    <>
     <ThemeProvider theme={theme}>
     <ShoppingListProvider>
     <NavBar/>
     <Outlet/>
     </ShoppingListProvider> 
     </ThemeProvider>
    </>
  )
}

export default App

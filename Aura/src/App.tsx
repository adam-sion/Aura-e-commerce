
import './App.css'
import { Outlet } from 'react-router-dom'
import { NavBar } from './components/NavBar/NavBar'
import { theme } from './themes/theme'
import { ThemeProvider } from '@mui/material'
import { ShoppingListProvider } from './contexts/shoppingCartContext'


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
    </>
  )
}

export default App

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { HomePage } from "../views/HomePage/HomePage";
import { ProductDetails } from "../components/ProductDetails/ProductDetails";
import { Category } from "../components/Category/Category";
import { ShoppingCart } from  "../components/ShoppingCart/ShoppingCart";
import { NotFound } from "../views/NotFound/NotFound";
import { Login } from "../views/Login/Login";
import { Signup } from "../views/Signup/Signup";
import { AdminDash } from "../views/AdminDash/AdminDash";

    export const routes = [
        {path:"", element:<HomePage/>, name:"Home"},
        {path:"/men",element:<Category category={"men"}/>, name :"Men"},
        {path:"/women",element:<Category category={"women"}/>, name :"Women"},
        {path:"/kids",element:<Category category={"kids"}/>, name :"Kids"},
    ]


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [...routes,{path:"/product/:productId", element: <ProductDetails/>},
            {path:"/shoppingCart", element: <ShoppingCart/>},
            {path:"/login", element:<Login/>},
            {path:"/signup", element:<Signup/>},
            {path:"/adminDash", element:<AdminDash/>},
            {path:"*", element:<NotFound/>}
        ]
    }
])


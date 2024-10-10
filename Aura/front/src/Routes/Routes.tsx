import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { HomePage } from "../views/HomePage/HomePage";
import { ProductDetails } from "../components/ProductDetails/ProductDetails";
import { Category } from "../components/Category/Category";
import { ShoppingCart } from "../components/ShoppingCart/ShoppingCart";

    export const routes = [
        {path:"", element:<HomePage/>, name:"Home"},
        {path:"/men",element:<Category category={"men"}/>, name :"Men"},
        {path:"/women",element:<Category category={"women"}/>, name :"Women"},
        {path:"/kids",element:<Category category={"kid"}/>, name :"Kids"},

    ]


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [...routes,{path:"/product/:productId", element: <ProductDetails/>},
            {path:"/shoppingCart", element: <ShoppingCart/>}
        ]
    }
])


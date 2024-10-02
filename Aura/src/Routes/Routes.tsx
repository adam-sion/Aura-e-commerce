import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { HomePage } from "../views/HomePage";

    export const routes = [
        {path:"", element:<HomePage/>, name:"Home"},
        {path:"/men",element:<HomePage/>, name :"Men"},
        {path:"/women",element:<HomePage/>, name :"Women"},
        {path:"/kids",element:<HomePage/>, name :"Kids"},

    ]


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [...routes,{path:"/product/:productId", element: <HomePage/>}]
    }
])


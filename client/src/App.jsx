import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import {Layout, RequireAuth} from "./routes/layout/Layout";
 import Register from "./routes/register/Register";
 import Login from "./routes/login/Login";
import HomePage from "./routes/homePage/HomePage";
import ListPage from "./routes/listPage/ListPage";
import SinglePage from "./routes/singlePage/SinglePage";
import ProfilePage from "./routes/profilePage/ProfilePage";
import ProfileUpdatePage from "./routes/profileUpdatePage/ProfileUpdatePage";
import NewPostPage from "./routes/newPostPage/NewPostPage";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loader";

function App
() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
       children:[
        {
          path:"/",
          element:<HomePage/>
        },
        {
          path:"/list",
          element:<ListPage/>,
          loader:listPageLoader
        },
        {
          path:'/:id',
          element:<SinglePage/>,
          loader:singlePageLoader
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/register',
          element:<Register/>
        }
       ]
    },

    {
      path:'/',
      element:<RequireAuth/>,
      children:[
        {
          path:'/profile',
          element:<ProfilePage/>,
          loader:profilePageLoader
        },
        {
          path:'/profile/update',
          element:<ProfileUpdatePage/>
        },
        {
          path:'/add',
          element:<NewPostPage/>
        }
      ]
    }
    
    
   

  ]);

  return <RouterProvider router={router} />;

}

export default App

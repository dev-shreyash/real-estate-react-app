import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import Register from "./routes/register/Register.jsx";
import Login from "./routes/login/Login.jsx";
import HomePage from './routes/homePage/homePage.jsx'
import ListPage from "./routes/listPage/ListPage.jsx";
import SinglePage from "./routes/singlePage/SinglePage.jsx";
import ProfilePage from "./routes/profilePage/ProfilePage.jsx";
import ProfileUpdatePage from "./routes/profileUpdatePage/ProfileUpdatePage.jsx";
import NewPostPage from "./routes/newPostPage/NewPostPage.jsx";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loader.js";
import { Layout, RequireAuth } from "./routes/layout/Layout.jsx";

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

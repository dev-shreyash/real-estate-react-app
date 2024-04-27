import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {Layout} from "./routes/layout/Layout";
import Register from "./routes/register/Register";
import Login from "./routes/login/Login";
import ProfilePage from "./routes/profilePage/ProfilePage";
import { profilePageLoader } from "./lib/loader";
import RequireAuth from "./routes/requireAuth/RequireAuth";

function App
() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
       
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader
        },
      
      ],
    },
  ]);

  return <RouterProvider router={router} />;

}

export default App

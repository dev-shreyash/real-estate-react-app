import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {Layout} from "./routes/layout/Layout";
import Register from "./routes/register/Register";
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
       
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    // {
    //   path: "/",
    //   element: <RequireAuth />,
    //   children: [
    //     {
    //       path: "/profile",
    //       element: <ProfilePage />,
    //       loader: profilePageLoader
    //     },
    //     {
    //       path: "/profile/update",
    //       element: <ProfileUpdatePage />,
    //     },
    //     {
    //       path: "/add",
    //       element: <NewPostPage />,
    //     },
    //   ],
    // },
  ]);

  return <RouterProvider router={router} />;

}

export default App

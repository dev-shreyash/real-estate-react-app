import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {Layout} from "./routes/layout/Layout";
import Register from "./routes/register/Register";
import Login from "./routes/login/Login";

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

  ]);

  return <RouterProvider router={router} />;

}

export default App

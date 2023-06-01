import React from 'react'
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from './App.tsx';
import './index.css';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import { UserProvider } from './context/UserContext.tsx';

const router = createBrowserRouter([
  {
    path:"/",
    element: <Login />,
  },
  {
    path:"/invalid-login",
    element: <h1>You do not have an existing username or password.</h1>
  },
  {
    path:"/signup",
    element:<Signup />,
  },
  {
    path: "/alreadyuser",
    element: <h1>Looks like you already have a login! Head back to login</h1>
  },
  // {
  //   path: "/invalid-login",
  //   element: <Login />
  // },
  {
    path:"/notebook",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
    <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)

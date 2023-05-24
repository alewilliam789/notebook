import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from './App.tsx'
import Note from './components/Note.tsx';
import './index.css'
import Login from './components/Login.tsx';

const router = createBrowserRouter([
  {
    path:"/",
    element: <Login />,
  },
  {
    path:"/signup",
    element:<Login />,
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

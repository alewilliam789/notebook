import React from 'react'
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from './App.tsx';
import './index.css';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import { UserProvider } from './context/UserContext.tsx';
import { NotesProvider } from './context/NotesContext.tsx';

const router = createBrowserRouter([
  {
    path:"/",
    element: <Login />,
  },
  {
    path:"/signup",
    element:<Signup />,
  },
  {
    path:"/notebook",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <NotesProvider>
        <RouterProvider router={router} />
      </NotesProvider>
    </UserProvider>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from './App.tsx';
import './index.css';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import { NotesProvider } from './context/NotesContext.tsx';
import { CookiesProvider } from 'react-cookie';
import ProtectedRoute from './routes/ProtectedRoute.tsx'

const router = createBrowserRouter([
  {
    path:"/login",
    element: <Login />,
  },
  {
    path:"/signup",
    element:<Signup />,
  },
  {
    path:"/notebook",
    element:
     <ProtectedRoute>
        <App />
     </ProtectedRoute>
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <NotesProvider>
        <RouterProvider router={router} />
      </NotesProvider>
    </CookiesProvider>
  </React.StrictMode>,
)

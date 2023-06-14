import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from './App.tsx';
import './index.css';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import { NotesProvider } from './context/NotesContext.tsx';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import { UserProvider } from './context/UserContext.tsx';

const router = createBrowserRouter([
  {
    path:"/",

    element:
      <Login />
  },
  {
    path:"/signup",
    element:<Signup />,
  },
  {
    path:"/notebook",
    element:
    <UserProvider>
     <ProtectedRoute>
        <App />
     </ProtectedRoute>
    </UserProvider>
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <NotesProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </NotesProvider>
  </React.StrictMode>,
)

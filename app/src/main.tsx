import React from 'react'
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from './App.tsx';
import './index.css';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import { NotesProvider } from './context/NotesContext.tsx';
import Notepad from './components/Notepad.tsx';
import { CookiesProvider } from 'react-cookie';

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
    children: [
      {
        path: "notebook/notes",
        element: <Notepad />,
      } 
    ],
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

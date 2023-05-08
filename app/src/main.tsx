import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from './Root.tsx'
import Note from './components/Note.tsx';
import './index.css'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Root />,
    children: [
      {
        path:"/notes/:notesId",
        element: <Note />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

import App from './App.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import { UserProvider } from './context/UserContext.tsx';

import './index.css';

const router = createBrowserRouter([
  {
    path:"/",
    element:
      <Login />
  },
  {
    path:"/signup",
    element:<Signup />
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


const queryClient = new QueryClient({
  defaultOptions : {
    queries :{
      cacheTime : 1000 * 60 * 60 * 24,
      refetchOnWindowFocus : false,
    }
  }
});

const persister = createSyncStoragePersister({
  storage: window.localStorage
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
        <UserProvider>
          <PersistQueryClientProvider 
          client={queryClient}
          persistOptions={{ persister}}>
            <RouterProvider router={router} />
          </PersistQueryClientProvider>
        </UserProvider>
  </React.StrictMode>,
)

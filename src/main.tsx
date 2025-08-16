import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/home.css'
import './styles/watch.css'
import Home from './Home.tsx'
import Upload from './Upload.tsx'
import Watch from './Watch.tsx'
import Studio from './Studio.tsx'
import Login from './Login.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './AuthContext.tsx'
import { ProtectedRoute } from './ProtectedRoute.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    
    element: (<ProtectedRoute><Home/></ProtectedRoute>)
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/dashboard", 
    element: (
    <ProtectedRoute>
      <Studio/>
    </ProtectedRoute>)
  },
  {
    
    path: "/upload",
    element: (<ProtectedRoute><Upload/></ProtectedRoute>)
  },
  {
    path: "/watch/:videoId",
    element: (<ProtectedRoute><Watch/></ProtectedRoute>)
  },
  {
    path: "*",
    element: <h1> invalid route </h1>
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)

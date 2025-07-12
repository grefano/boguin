import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.tsx'
import Upload from './Upload.tsx'
import Watch from './Watch.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/upload",
    element: <Upload/>
  },
  {
    path: "/watch",
    element: <Watch/>
  },
  {
    path: "*",
    element: <h1> cu </h1>
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

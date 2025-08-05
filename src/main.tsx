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
    path: "/watch/:videoId",
    element: <Watch/>
  },
  {
    path: "*",
    element: <h1> cu </h1>
  }
]);

// const videos = document.querySelectorAll<HTMLElement>('video')

// document.addEventListener('mousemove', (event) => {
//     // Get mouse coordinates relative to the viewport
//     const mouseX = event.clientX;
//     const mouseY = event.clientY;

//     // Update CSS variables (custom properties)4
//     videos.forEach(el => {
//       el.style.setProperty('--mouse-x', `${mouseX}px`);
//       el.style.setProperty('--mouse-y', `${mouseY}px`);
//     });

//     // Or directly set element's style properties
//     // element.style.left = `${mouseX}px`;
//     // element.style.top = `${mouseY}px`;
// });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

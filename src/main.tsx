
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/home.css'
import './styles/watch.css'
import './styles/channel.css'
import './styles/login.css'
import './styles/video.css'
import './components/Comment/comment.css'
import './components/Comments/comments.css'
import Home from './Home.tsx'
import Upload from './Upload.tsx'
import Watch from './Watch.tsx'
import Studio from './Studio.tsx'
import Login from './Login.tsx'
import Channel from './Channel.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './AuthContext.tsx'
import { ProtectedRoute } from './ProtectedRoute.tsx'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

const router = createBrowserRouter([
  {
    path: "/",
    
    element: (<Home/>)
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/dashboard", 
    element: (<ProtectedRoute> <Studio/> </ProtectedRoute>)
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
    path: "/channel/:id",
    element: (<Channel/>)
  },
  {
    path: "*",
    element: <h1> invalid route </h1>
  }
]);

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}/>
        <Analytics />
        <SpeedInsights />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)

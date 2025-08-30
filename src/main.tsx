
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
import './components/CreateComment/createcomment.css'
import Home from './pages/home/Home.tsx'
import Testando from './pages/testando/Testando.tsx'
import Upload from './pages/upload/Upload.tsx'
import Watch from './pages/watch/Watch.tsx'
import './pages/watch/watch.css'
import Studio from './pages/studio/Studio.tsx'
import Login from './pages/login/Login.tsx'
import Channel from './pages/channel/Channel.tsx'

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
    path: "/testando",
    
    element: (<Testando/>)
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


import Video from './components/Video'
import ButtonPage from './components/ButtonPage'
import type { VIDEO } from "./util/interfaces"

import { useEffect, useState } from 'react'

import { useAuth } from './AuthContext';

function Home() {
    

  
  
  const [videos, setVideos] = useState<any[]>([])
  const {isAuthenticated, isLoading} = useAuth()
  
  useEffect(() => {
    const fetchVideos = async () => {

      try {
        console.log(`fetch videos ${import.meta.env.VITE_URL_SERVER + '/videos/feed'}`)
        const response = await fetch(import.meta.env.VITE_URL_SERVER + '/videos/feed', {
          method: 'GET',
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json'
          }
        })
        if (!response.ok) {
          throw new Error(`Erro Http: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        console.log(`videos ${data}`)
        setVideos(data)
      } catch (err) {
        console.error('Error fetching videos:', err)
      }

      
    }
    fetchVideos()
  }, [])
  

  return (
  <>
    <div className='bar upper-bar'>
      <div className='right'>
        <button className="btnicon"> <span className="material-symbols-outlined">account_circle</span> </button>
        <button className='btnicon'> <span className="material-symbols-outlined">settings</span> </button>
        <ButtonPage link={isAuthenticated ? '/channel' : '/login'} className='btn-icon material-symbols-outlined'>account_circle</ButtonPage>

      </div> 
      <div className='center'>aawdwda</div>
      <div className='left'>awwad</div>
    </div>
    
    <nav id='buttons'>
      <ButtonPage id='btn-upload' link='/upload'> Upload </ButtonPage>
    </nav>  
    <div id='feed'>
      { !isLoading ? 
      videos.map((video: VIDEO) => (
        <Video {...video}/>
      )) : <div className='ctn loading'>loading videos</div>
      }
    </div>
  </>)
}

export default Home;
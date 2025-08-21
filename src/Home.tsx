
import Video from './components/Video'
import ButtonPage from './components/ButtonPage'

import { useEffect, useState } from 'react'



import { get_cloud_url_thumbnail } from './util/cloudinaryUrls';

function Home() {
    

  
  
  const [videos, setVideos] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  
  
  useEffect(() => {
    const fetchVideos = async () => {

      try {
        console.log(`fetch videos ${import.meta.env.VITE_URL_SERVER + '/videos/feed'}`)
        const response = await fetch(import.meta.env.VITE_URL_SERVER + '/videos/feed')
        console.log(await response.text())
        if (!response.ok) {
          throw new Error(`Erro Http: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        console.log(data)
        setVideos(data)
      } catch (err) {
        console.error('Error fetching videos:', err)
        setError("nao foi possivel carregar os videos")
      } finally {
        setIsLoading(false)
      }

      
    }
    fetchVideos()
  }, [])
  
  // fetch(API_BASE_URL + '/videos')
  // .then(response => response.json())
  // .then(data => console.log(data))
  // .catch(error => console.error('Error fetchin videos:', error))

  if (isLoading) {
    //return <div>loading videos</div>
  }
  if (error) {
    //return <div>{error}</div>
  }
  return (
  <>
    <div className='bar upper-bar'>
      <div className='right'>
        <button className="btnicon"> <span className="material-symbols-outlined">account_circle</span> </button>
        <button className='btnicon'> <span className="material-symbols-outlined">settings</span> </button>
        <ButtonPage link='/login' className='btn-icon material-symbols-outlined'>account_circle</ButtonPage>
      </div> 
      <div className='center'>aawdwda</div>
      <div className='left'>awwad</div>
    </div>
    
    <nav id='buttons'>
      <ButtonPage id='btn-upload' link='/upload'> Upload </ButtonPage>
    </nav>  
    <div id='feed'>
      { 
      videos.map(video => (
        <Video title={video.title} thumbnail={get_cloud_url_thumbnail(video.id_thumb)} video={video.id}/>
      ))
      }
    </div>
  </>)
}

export default Home;
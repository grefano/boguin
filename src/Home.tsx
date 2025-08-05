
import Video from './components/Video'
import ButtonPage from './components/ButtonPage'

import { useEffect, useState } from 'react'

import { Cloudinary } from '@cloudinary/url-gen'
import { auto } from '@cloudinary/url-gen/actions/resize'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'
import { AdvancedImage } from '@cloudinary/react'



import { get_cloud_url_thumbnail, get_cloud_url_video } from './util/cloudinaryUrls';

function Home() {
    

  
  
  const [videos, setVideos] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  
  const API_BASE_URL = 'http://localhost:3000/api'
  
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(API_BASE_URL + '/videos')
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
    <nav id='buttons'>
      <ButtonPage id='btn-upload' link='/upload'> Upload </ButtonPage>
    </nav>  
    <div id='feed'>
      { 
      videos.map(video => (
        <Video title={video.title} thumbnail={get_cloud_url_thumbnail('ruivcqn2rjno46fbkqi5')} video={'vem6ku9epmtpbivzaq9k'}/>
      ))
      }
    </div>
  </>)
}

export default Home;
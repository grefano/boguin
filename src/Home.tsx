
import ButtonPage from './components/ButtonPage/ButtonPage'
import Feed from './components/Feed/Feed'

import { useEffect, useState } from 'react'

import { useAuth } from './AuthContext';



const handleVideosFetch = async (kind: string) => {
  let endpoint = ''
  if (kind == 'subscriptions'){
    endpoint = 'subscriptions/' + localStorage.getItem('user')
  }
  

  console.log(endpoint)
  const response = await fetch(import.meta.env.VITE_URL_SERVER + '/videos/feed/' + endpoint, {
    method: 'GET',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error(`Erro Http: ${response.status} ${response.statusText}`)
  }
  return await response.json()

  
}


function Home() {
  
  
  
  const [feedKind, setFeedKind] = useState<'default' | 'subscriptions'>('default')
  const [videos, setVideos] = useState<any[]>([])
  const {isAuthenticated, isLoading} = useAuth()
  
  const handleClickSetFeed = async (kind: 'default' | 'subscriptions') => {
    setFeedKind(kind)
    const videos = await handleVideosFetch(kind)
    console.log(videos)
    setVideos(videos)
  }
  useEffect(() => {
    const fetchVideos = async () => {

      try {
        

        const data = await handleVideosFetch(feedKind)
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
    <div className='ctn-masthead'>
      <ButtonPage id='btn-upload' className='masthead' link='/upload'> Upload </ButtonPage>
      <ButtonPage link={isAuthenticated ? '/channel' : '/login'} id="btn-icon-account" className={'btn-icon masthead' + (isAuthenticated ? ' logged' : '')}>
        <span className='icon material-symbols-outlined'>account_circle</span> 
        <span> {isAuthenticated ? 'Meu canal' : 'Fazer login' }</span>
      </ButtonPage>
      {/* <ButtonPage link={isAuthenticated ? '/channel' : '/login'} id="btn-icon-account" className={'btn-icon masthead' + (isAuthenticated && ' logged')}>
        <span className='icon material-symbols-outlined'>account_circle</span> 
        {isAuthenticated && <span>Fazer login</span>}
      </ButtonPage> */}
      

    </div>

    {/* <Releases/> */}
    
    <div id='ctn-buttons-feed'>
      <button onClick={() => handleClickSetFeed('default')}>Default</button>
      <button onClick={() => handleClickSetFeed('subscriptions')}>Subscriptions</button>
    </div>
      { !isLoading ? 
        <Feed videos={videos}/>
       : <div className='ctn loading'>loading videos</div>
      }
  </>)
}

export default Home;
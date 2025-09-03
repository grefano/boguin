
import ButtonPage from '../../components/ButtonPage/ButtonPage'
import Feed from '../../components/Feed/Feed'
import './home.css'
import { useEffect, useState } from 'react'

import { useAuth } from '../../AuthContext';
import useFetchAuth from '../../util/authfetch';





function Home() {
  
  const fetchAuth = useFetchAuth()
  
  const [feedKind, setFeedKind] = useState<'default' | 'subscriptions'>('default')
  const [videos, setVideos] = useState<any[]>([])
  const [pageNumber, setPageNumber] = useState<number>(0)
  const {isAuthenticated, isLoading, token} = useAuth()
  const [qtdNotifications, setQtdNotifications] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  
  const handleVideosFetch = async (kind: string, page: number) => {
    let endpoint = ''
    let needAuth = false
    if (kind == 'subscriptions'){
      endpoint = 'subscriptions'
      needAuth = true 
    }
    
    const getFetchFunction = () => {
      return needAuth ? fetchAuth : fetch
    }
  
    console.log(kind, endpoint, page)
    const response = await getFetchFunction()(import.meta.env.VITE_URL_SERVER + `/videos/feed/${endpoint}?page=${page}`, {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error(`Erro Http: ${response.status} ${response.statusText}`)
    }
    const videos = await response.json()
    console.log(videos)
    return videos
  
    
  }
  const handleClickSetFeed = async (kind: 'default' | 'subscriptions') => {
    setFeedKind(kind)
    const videos = await handleVideosFetch(kind, pageNumber)
    console.log(videos)
    setVideos(videos)
    setPageNumber(0)
  }
  useEffect(() => {
    console.log('first videos')
    const fetchVideos = async () => {
      try {
        const data = await handleVideosFetch(feedKind, pageNumber)
        console.log(`videos ${data}`)
        setVideos(data)
      } catch (err) {
        console.error('Error fetching videos:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()

  }, [])

  const createRequestMore = (feedKind: string) => {
    return async function handleVideos(page: number){
      console.log('pagenumber + 1 = ', page+1)
      const videos = await handleVideosFetch(feedKind, page+1)
      setVideos(prev => ([...prev, ...videos]))
      setPageNumber(prev => {
        return prev+1
      })
      return videos
    }
  }


  useEffect(() => {
    const fetchFriendNotifications = async () => {
      try {
        const response = await fetchAuth(import.meta.env.VITE_URL_SERVER + `/friends?status=pending`, {
          method: 'GET'
        })
        const data = await response.json()
        console.log('friend requests', data)
        setQtdNotifications(data.length)
      } catch (err) {
        console.log('error fetching friend notifications:', err)
      }
    } 
    fetchFriendNotifications()
  }, [isAuthenticated, token])
  
  

  return (
  <>
    <div className='ctn-masthead'>
      <ButtonPage id='btn-upload' className='btn-icon masthead' link='/upload'>
        <span className='icon material-symbols-outlined'>upload</span>
        <span>Publicar</span>  
      </ButtonPage>

      <ButtonPage link='/friends' className='btn-icon masthead'>
        <span className='icon material-symbols-outlined'>groups</span>
        <span>Amigos</span>  
        {isAuthenticated && qtdNotifications > 0 ? <span className='badge'>{qtdNotifications}</span> : null}
      </ButtonPage>

      <ButtonPage link={isAuthenticated ? '/dashboard' : '/login'} id="btn-icon-account" className={'btn-icon masthead' + (isAuthenticated ? ' logged' : '')}>
        <span className='icon material-symbols-outlined'>account_circle</span> 
        <span> {isAuthenticated ? 'Meu canal' : 'Fazer login' }</span>
      </ButtonPage>
      

    </div>

    {/* <Releases/> */}
    
    <div id='ctn-buttons-feed'>
      <button onClick={() => handleClickSetFeed('default')}>Default</button>
      <button onClick={() => handleClickSetFeed('subscriptions')}>Subscriptions</button>
    </div>
      { !isLoading ? 
        <Feed videos={videos} loading={loading} page={pageNumber} requestMore={createRequestMore(feedKind)}/>
       : <div className='ctn loading'>loading videos</div>
      }
  </>)
}

export default Home;
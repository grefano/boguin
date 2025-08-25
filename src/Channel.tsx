import { useEffect, useState } from "react"
import Video from "./components/Video"
import { useParams } from "react-router-dom"
import { get_cloud_url_thumbnail } from './util/cloudinaryUrls';

type StateLoad = 'loading' | 'success' | 'notfound' | 'error'

function Channel(){
    const [videos, setVideos] = useState<any[]>([])
    const [stateLoadUser, setStateLoadUser] = useState<StateLoad>('loading')
    const [stateLoadVideos, setStateLoadVideos] = useState<StateLoad>('loading')

    const params = useParams()
    const channelId = params.id

    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_URL_SERVER + `/users/${channelId}`, {
                    headers: {'ngrok-skip-browser-warning': 'true'}
                })
                console.log(response)
                setStateLoadUser(response.ok ? 'success' : 'notfound')
            } catch (error){
                setStateLoadUser('error')
                console.log(error)
            }
        }
        fetchChannel()
    }, [])
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_URL_SERVER + `/videos/users/${channelId}`, {
                    headers: { 'ngrok-skip-browser-warning': 'true' }
                })
                const data = await response.json()
                console.log(data)
                setVideos(data)
                setStateLoadVideos('success')
            } catch (error){
                setStateLoadVideos('error')
                console.error(error)
            }
        }
        fetchVideos()
    }, [])
    return (<>
        {stateLoadUser == 'loading'?
            (<div>carregando</div>)
        :null}
        {stateLoadUser == 'notfound' || stateLoadUser == 'error'?
            (<div>usuário não encontrado</div>)
        :null}
        {stateLoadUser == 'success'?
            <>
                <h1>{channelId}</h1>
                <div id="ctn-channel-videos">
                {stateLoadVideos == 'loading'?
                    (<div>carregando</div>)
                :null}
                {stateLoadVideos == 'notfound' || stateLoadVideos == 'error'?
                    (<div>vídeos não encontrados</div>)
                :null}
                {stateLoadVideos == 'success'?
                    videos.map(video => (
                        <Video video={video}/>
                    ))
                :null}
                </div>
            </>
        :null}
            
        
    </>)
}

export default Channel
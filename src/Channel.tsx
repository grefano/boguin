import { useEffect, useState } from "react"
import Video from "./components/Video"
import { useParams } from "react-router-dom"
import { get_cloud_url_thumbnail } from './util/cloudinaryUrls';

function Channel(){
    const [videos, setVideos] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const params = useParams()
    const channelId = params.id

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_URL_SERVER + `/videos/users/${channelId}`)
                const data = await response.json()
                console.log(data)
                setVideos(data)
                setIsLoading(false)
            } catch (error){
                setIsLoading(true)
                console.error(error)
            }
        }
        fetchVideos()
    }, [])
    if (isLoading){
        return (<div>loading</div>)
    }
    return (<>
    <h1>{channelId}</h1>
        <div id="ctn-channel-videos">
            {
                videos.map(video => (
                    <Video title={video.title} thumbnail={get_cloud_url_thumbnail(video.id_thumb)} video={video.id}/>
                ))
            }
        </div>
    </>)
}

export default Channel
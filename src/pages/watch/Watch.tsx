
import { useEffect, useState } from 'react'
import ButtonPage from '../../components/ButtonPage/ButtonPage'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'
import { useLocation, useParams } from 'react-router-dom'
import CreateComment from '../../components/CreateComment/CreateComment'
import Comments from '../../components/Comments/Comments'

function Watch() {
    const location = useLocation()
    const params = useParams()
    console.log(`params ${params}`)
    const videoId = params.videoId
    console.log(`videoId ${videoId}`)
    const [video, setVideo] = useState(Object)
    console.log(`video json${JSON.stringify(video)}`)
    console.log(`video ${video}`)
    const [comments, setComments] = useState([])
    if (!videoId){
        return <div>video id não especificado</div>
    }
    useEffect(() => {
        const getVideo = async () => {
            console.log(location.state?.videoData)
            if (location.state?.videoData) {
                console.log('video foi passado')
                setVideo(location.state.videoData)
            } else {
                console.log('video fetch')
                const fetchVideo = async (id: string) => {
                    const response = await fetch(import.meta.env.VITE_URL_SERVER + '/videos/' + id, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    if (!response.ok){
                        throw new Error(`Erro Http: ${response.status} ${response.statusText}`)
                    }
                    const data = await response.json()
                    console.log(`fetch video ${data}`)
                    return data
                }   
                setVideo(await fetchVideo(videoId as string))
            }
        }
        getVideo()
        
    }, [location.state, videoId])
    useEffect(() => {
        const getComments = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_URL_SERVER + '/comments/' + videoId)
                if (!response.ok){
                    throw new Error(`Erro Http: ${response.status} ${response.statusText}`)
                }
                setComments(await response.json())
            } catch (error){
                console.log(error)
            }
        }
        getComments()
    }, [videoId])
    console.log(`video = ${JSON.stringify(video)}` )
    return (
        <div id='ctn-watch'>

            <VideoPlayer id={video.id}></VideoPlayer>
            <p id="player-title">{video.title}</p>
            <CreateComment id_video={video.id}/>
            <Comments comments={comments}/>
        </div>
    )
}
export default Watch
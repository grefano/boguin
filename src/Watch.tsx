
import { useEffect, useState } from 'react'
import ButtonPage from './components/ButtonPage'
import VideoPlayer from './components/VideoPlayer'
import { useLocation, useParams } from 'react-router-dom'

function Watch() {
    const location = useLocation()
    const params = useParams()
    console.log(`params ${params}`)
    const videoId = params.videoId
    console.log(`videoId ${videoId}`)
    const [video, setVideo] = useState(Object)
    console.log(`video json${JSON.stringify(video)}`)
    console.log(`video ${video}`)
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
    console.log(`video = ${video}` )
    return (
        <>
            <VideoPlayer id={video.id}></VideoPlayer>
            <p id="player-title">{video.title}</p>
            <nav id='buttons'>
                <ButtonPage id='btn-upload' link='/'> Home </ButtonPage>
            </nav>

        </>
    )
}
export default Watch
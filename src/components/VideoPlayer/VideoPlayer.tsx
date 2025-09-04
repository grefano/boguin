
import { useEffect, useRef, useState } from 'react';
import { get_cloud_url_video } from '../../util/cloudinaryUrls';
import { useAuth } from '../../AuthContext';
import useFetchAuth from '../../util/authfetch';

interface Props {
    id: string
}

function VideoPlayer({id}: Props) {
    // const { publicId } = useParams<{ publicId: string }>()
    // const params = useParams();
    // console.log(params)
    // const publicId = params.videoId
    const {user} = useAuth()
    const fetchAuth = useFetchAuth()
    const refVideo = useRef<HTMLVideoElement>(null)
    const refWatchTime = useRef(0)
    const refInterval = useRef<NodeJS.Timeout | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    
    const sendWatchTime = async () => {
        console.log('trying send watch time ', refWatchTime.current, user)
        if (refWatchTime.current > 0 && user){
            console.log('send watch time')
            const response = await fetchAuth(import.meta.env.VITE_URL_SERVER + `/data/watchtime/${id}/${refWatchTime.current}`, {
                method: 'POST'
            })
            refWatchTime.current = 0
            console.log('response watch time', await response.json())
            
        }
    }
    
    useEffect(() => {
        const video = refVideo.current
        if (!video || !id) return;
        
        const onPlay = () => {
            console.log('play')
            setIsPlaying(true)
            refInterval.current = setInterval(() => {
                refWatchTime.current += 1
            }, 1000)
        }
        
        const onPause = () => {
            console.log('pause')
            setIsPlaying(false)
            if (refInterval.current){
                clearInterval(refInterval.current)
            }
            sendWatchTime()
        }

        const onTimeUpdate = () => {
            // só para reativar o monitoramento de atividade
        }
        
        video.addEventListener('play', onPlay)
        video.addEventListener('pause', onPause)
        video.addEventListener('ended', onPause)
        video.addEventListener('timeupdate', onTimeUpdate)
        
        const handleBeforeUnload = () => {
            sendWatchTime()
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        
        return () => {
            video.removeEventListener('play', onPlay)
            video.removeEventListener('pause', onPause)
            video.removeEventListener('ended', onPause)
            video.removeEventListener('timeupdate', onTimeUpdate)
            window.removeEventListener('beforeunload', handleBeforeUnload)
            if (refInterval.current){
                clearInterval(refInterval.current)
            }
            sendWatchTime()
        }
        
    }, [user, id])
    
    if (!id){
        {console.log(id)}
        return (
            <div className='error-message'>
                <h2>id do vídeo não fornecido</h2>
            </div>
        )
    }
    const src = get_cloud_url_video(id)
    console.log(src)
    return (    
        <>
            <video ref={refVideo} controls >
                <source type="video/mp4" src={src}/>
                nao suportado
            </video>
        </>
    )
}

export default VideoPlayer
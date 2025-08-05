import { useParams } from 'react-router-dom'

import { get_cloud_url_thumbnail, get_cloud_url_video } from '../util/cloudinaryUrls';


function VideoPlayer() {
    // const { publicId } = useParams<{ publicId: string }>()
    const params = useParams();
    console.log(params)
    const publicId = params.videoId
    if (!publicId){
        {console.log(publicId)}
        return (
            <div className='error-message'>
                <h2>id do vídeo não fornecido</h2>
            </div>
        )
    }
    const src = get_cloud_url_video(publicId)
    console.log(src)
    return (    
        <>
            <div id="video-player">
                <video controls>
                    <source type="video/mp4" src={src}/>
                    nao suportado
                </video>
                <p id="player-title">título irado</p>
            </div>
        </>
    )
}

export default VideoPlayer
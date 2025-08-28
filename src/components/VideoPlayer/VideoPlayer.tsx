
import { get_cloud_url_video } from '../../util/cloudinaryUrls';

interface Props {
    id: string
}

function VideoPlayer({id}: Props) {
    // const { publicId } = useParams<{ publicId: string }>()
    // const params = useParams();
    // console.log(params)
    // const publicId = params.videoId
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
            <video controls>
                <source type="video/mp4" src={src}/>
                nao suportado
            </video>
        </>
    )
}

export default VideoPlayer
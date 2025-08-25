import React, { useRef } from "react";
import { Link } from 'react-router-dom';
import { get_cloud_url_thumbnail } from "../util/cloudinaryUrls";

interface VIDEO {
    id: string,
    id_thumb: string,
    id_channel: string,
    title: string
}
interface Props {
    video: VIDEO
}

function Video({video}: Props) {
    console.log('video thumb:', video.id_thumb)

    const imgRef = useRef<HTMLImageElement>(null);
    const ctnRef = useRef<HTMLImageElement>(null);
    function handleMouseMove(e: React.MouseEvent){
        const img = imgRef.current
        const ctn = ctnRef.current
        if (!ctn) return;
        if (!img) return;
        const rect = ctn.getBoundingClientRect()
        const x = -(e.nativeEvent.clientX - (rect.left + rect.width / 2)) / (rect.width/2) * .1
        const y = (e.nativeEvent.clientY - (rect.top + rect.height / 2)) / (rect.height/2) * .1//((e.nativeEvent.clientY - rect.top) / rect.height - 0.5) * 20;
        img.style.setProperty('--mouse-x', `${x}`);
        img.style.setProperty('--mouse-y', `${y}`);
        console.log(`${x} ${y}`)
    }
    function handleMouseLeave(){
        const img = imgRef.current
        if (!img) return;
        img.style.setProperty('--mouse-x', `0`)
        img.style.setProperty('--mouse-y', `0`)
    }
    return (
        <Link to={'/watch/' + video.id} state={{videoData: video}}>
            <div ref={ctnRef} className="video">
                <img ref={imgRef} src={get_cloud_url_thumbnail(video.id_thumb)} alt=""  onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}/>
                <div>
                    <img src="" alt="channel"/>
                    <p className="video-title" >{video.title}</p>   
                </div>
            </div>
        </Link>
    )

}

export default Video
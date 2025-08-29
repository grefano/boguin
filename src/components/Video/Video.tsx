import React, { useRef } from "react";
import { Link } from 'react-router-dom';
import { get_cloud_url_thumbnail } from "../../util/cloudinaryUrls.ts";
import type { VIDEO } from "../../util/interfaces.ts"; 


function Video({id, id_thumb, id_channel, title}: VIDEO) {

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
    }
    function handleMouseLeave(){
        const img = imgRef.current
        if (!img) return;
        img.style.setProperty('--mouse-x', `0`)
        img.style.setProperty('--mouse-y', `0`)
    }
    return (
        <Link to={'/watch/' + id} state={{videoData: {id, id_thumb, id_channel, title}}}>
            <div ref={ctnRef} className="video">
                <img ref={imgRef} src={get_cloud_url_thumbnail(id_thumb)} alt=""  onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}/>
                <div className="ctn video-meta">
                    <p className="video-title" >{title}</p>   
                    <p className="video-channel">{id_channel}</p>
                </div>
            </div>
        </Link>
    )

}

export default Video
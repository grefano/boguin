import React, { useRef } from "react";
import { Link } from 'react-router-dom';
interface Props {
    title: string,
    thumbnail: string,
    video: string
}

function Video({title, thumbnail, video}: Props) {
    console.log('video thumb:', thumbnail)

    const imgRef = useRef<HTMLImageElement>(null);
    const ctnRef = useRef<HTMLImageElement>(null);
    function handleMouseMove(e: React.MouseEvent){
        const img = imgRef.current
        const ctn = ctnRef.current
        if (!ctn) return;
        if (!img) return;
        const rect = ctn.getBoundingClientRect()
        const x = -(e.nativeEvent.clientX - (rect.left + rect.width / 2)) * .1//((e.nativeEvent.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = (e.nativeEvent.clientY - (rect.top + rect.height / 2)) * .1//((e.nativeEvent.clientY - rect.top) / rect.height - 0.5) * 20;
        console.log(x, y)
        img.style.setProperty('--mouse-x', `${x}`);
        img.style.setProperty('--mouse-y', `${y}`);
    }
    function handleMouseLeave(e: React.MouseEvent){
        const img = imgRef.current
        if (!img) return;
        img.style.setProperty('--mouse-x', `0`)
        img.style.setProperty('--mouse-y', `0`)
    }

    return (<div ref={ctnRef} className="video" onClick={() => console.log('clicou')}>
        <Link to={'/watch/' + video}>
        <img ref={imgRef} src={thumbnail} alt=""  onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}/>
        </Link>
        <p className="video-title" >{title}</p>   
    </div>)
}

export default Video

interface Props {
    thumbnail: string;
    title: string;
}

function Video({ thumbnail, title }: Props) {
    return (<div className="video">
        <img src={thumbnail} alt="" />
        <p className="video-title" >{title}</p>   
    </div>)
}

export default Video
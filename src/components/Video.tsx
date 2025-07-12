
interface Props {
    thumbnail: string;
    title: string;
}

function Video({ thumbnail, title }: Props) {
    return (<div className="video">
        <a href={'/watch/' + ''}><img src={thumbnail} alt="" /></a>
        <p className="video-title" >{title}</p>   
    </div>)
}

export default Video
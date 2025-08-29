import Video from '../Video/Video'
import type { VIDEO } from "../../util/interfaces"


interface Props{
    videos: any[]
}

function Feed({videos}: Props){
    return (<div id='feed'>
      { videos.map((video: VIDEO) => (
        <Video {...video}/>
      )) }
    </div>)
}   

export default Feed
import Video from '../Video/Video'
import type { VIDEO } from "../../util/interfaces"
import { useCallback, useRef, useState } from 'react'


interface Props{
  videos: any[],
  loading: boolean,
  page: number,
  requestMore: (page: number) => Promise<any[]>
}

function Feed({videos, loading, page, requestMore}: Props){
  const [hasMore, setHasMore] = useState<boolean>(true)
  const observer = useRef<null | IntersectionObserver>(null)
  console.log('videos feed', videos)
  const refLastVideo = useCallback((node: HTMLDivElement) => {
    console.log('wadwa')
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(async (entries) => {
        console.log('maybe more', entries[0], hasMore)
      if (entries[0].isIntersecting && hasMore){
        console.log('more')
        const videos = await requestMore(page)
        console.log('set has more ', videos.length)
        setHasMore(videos.length > 0)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore, page])


  return (<div id='feed'>
    { videos ? videos.map((video: VIDEO, index) => {
      if (index + 1 === videos.length){
        return <Video {...video} ref={refLastVideo}/>
      } else {
        return <Video {...video} />
      } 
    }) : <span>loading</span>}
  </div>)
}   

export default Feed
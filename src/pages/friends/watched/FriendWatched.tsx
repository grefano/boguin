import { useEffect, useState } from "react"
import useFetchAuth from "../../../util/authfetch"
import { useNavigate, useParams } from "react-router-dom"
import Feed from "../../../components/Feed/Feed"



function FriendWatched(){
    const fetchAuth = useFetchAuth()
    const [videos, setVideos] = useState<any[]>([])
    const userId = useParams().userId
    const [loading, setLoading] = useState(true)
    const [pageNumber, setPageNumber] = useState(0)
    const navigate = useNavigate()
    async function handleVideosFetch(page: number){
        const response = await fetchAuth(import.meta.env.VITE_URL_SERVER + `/data/watchtime/${userId}?page=${page}`, {
            method: 'GET'
        })
        if (!response.ok){
            throw new Error(JSON.stringify(await response.json()))
        }
        return await response.json()
    }
    useEffect(() => {
        console.log('aidjwo')
        const fetchVideos = async () => {
            try {
                const data = await handleVideosFetch(pageNumber)
                setVideos(data)

            } catch (error){
                navigate('/')
            }
        }
        fetchVideos()
    }, [])

    async function requestMore(page: number){
      console.log('pagenumber + 1 = ', page+1)
      setLoading(true)
      const videos = await handleVideosFetch(page+1)
      setVideos(prev => ([...prev, ...videos]))
      setPageNumber(prev => {
        return prev+1
      })
      setLoading(false)
      return videos
    }

    return (<Feed videos={videos} loading={loading} page={pageNumber} requestMore={requestMore}/>)
}


export default FriendWatched
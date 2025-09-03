import { useEffect, useState } from "react"
import { useAuth } from "../../AuthContext"
import Feed from "../../components/Feed/Feed"
import useFetchAuth from "../../util/authfetch"

function Studio() {
    const [myvideos, setMyvideos] = useState<any[]>([])
    const {user, isAuthenticated} = useAuth()
    const [loading, setLoading] = useState<boolean>(true)
    const [pageNumber, setPageNumber] = useState(0)
    const fetchAuth = useFetchAuth()

    async function fetchVideos(page: number){
        console.log('get my videos')
        const data = await fetchAuth(import.meta.env.VITE_URL_SERVER + `/videos/users/${user}?page=${page}`, {
            method: 'GET'
        })
        return data.json()
    }
    useEffect(() => {
        const getMyVideos = async () => {
            if (!isAuthenticated || !user){
                return
            }
            try{
                const videos = await fetchVideos(pageNumber)
                setMyvideos(videos)
            } catch (error) {
                console.error('Erro ao buscar videos:', error)
            } finally {
                setLoading(false)
            }
        }
        getMyVideos()
    }, [])

    const handleVideos = async (page: number) => {
        console.log('page', page, ' + 1 = ', page+1)
        const videos = await fetchVideos(page)
        console.log('videos received', videos)
        setMyvideos(prev => ([...prev, ...videos]))
        setPageNumber(prev => {
            return prev+1
        })
        return videos
    }

    return (
        <div id="ctn-myvideos" className="ctn">
            <Feed videos={myvideos} loading={loading} page={pageNumber} requestMore={handleVideos}/>
        </div>
    )
}

export default Studio;
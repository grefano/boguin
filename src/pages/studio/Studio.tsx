import { useEffect, useState } from "react"
import { useAuth } from "../../AuthContext"
import Feed from "../../components/Feed/Feed"

function Studio() {
    const [myvideos, setMyvideos] = useState<any[]>([])
    const {user, isAuthenticated} = useAuth()

    useEffect(() => {
        const getMyVideos = async () => {
            if (!isAuthenticated || !user){
                return
            }
            try{
                console.log('get my videos')
                const data = await fetch(import.meta.env.VITE_URL_SERVER + '/videos/users/' + user, {
                    method: 'GET'
                })
                const videos = await data.json()
                setMyvideos(videos)
            } catch (error) {
                console.error('Erro ao buscar videos:', error)
            }
        }
        getMyVideos()
    }, [])

    return (
        <div id="ctn-myvideos" className="ctn">
            <Feed videos={myvideos}/>
        </div>
    )
}

export default Studio;
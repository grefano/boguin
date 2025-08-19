import { useEffect, useState } from "react"
import Video from "./components/Video"

function Studio() {
    const [myvideos, setMyvideos] = useState<any[]>([])
    useEffect(() => {
        const getMyVideos = async () => {
            try{
                const data = await fetch(import.meta.env.VITE_URL_SERVER + '/videos/123', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const videos = await data.json()
                setMyvideos(videos)
            } catch (error) {
                console.error('Erro ao buscar videos:', error)
            }
        }
        getMyVideos()
    }, [])

    console.log('myvideos', myvideos)
    return (
        <div id="ctn-myvideos" className="ctn">

        </div>
    )
}

export default Studio;
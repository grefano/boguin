import Video from "./components/Video"
import Subscribe from "./components/Subscribe"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import type { VIDEO } from "./util/interfaces";



function fetchChannel(channelId: string){
    return fetch(import.meta.env.VITE_URL_SERVER + `/users/${channelId}`).then(res => {
        if (!res.ok){
            throw new Error(`erro fetch channel ${res.status}`)
        }
        return res.json()
    })
} 
function fetchVideos(channelId: string){
    return fetch(import.meta.env.VITE_URL_SERVER + `/videos/users/${channelId}`).then(res => {
        if (!res.ok){
            throw new Error(`erro fetch channel ${res.status}`)
        }
        return res.json()
    })
} 


function Channel(){
    const navigate = useNavigate()
    const params = useParams()
    const channelId = params.id

    if (channelId == undefined) {
       navigate('/', {replace: true})
    }

    const {status: channelStatus} = useQuery({
        queryKey: ["channel-user"],
        queryFn: () => fetchChannel(channelId as string)
    })
    
    const {status: videosStatus, data: videosData} = useQuery({
        queryKey: ["channel-videos"],
        queryFn: () => fetchVideos(channelId as string),
    })
    return (<>
        {channelStatus == "pending"?
            (<div>carregando</div>)
        :null}
        {channelStatus == "error"?
            (<div>usuário não encontrado</div>)
        :null}
        {channelStatus == "success"?
            <>
                <h1>{channelId}</h1>
                <Subscribe channelId={channelId as string}/>
                <div id="ctn-channel-videos">
                {videosStatus == "pending"?
                    (<div>carregando</div>)
                :null}
                {videosStatus == "error"?
                    (<div>vídeos não encontrados</div>)
                :null}
                {videosStatus == "success"?
                    videosData.map((video: VIDEO) => (
                        <Video {...video}/>
                    ))
                :null}
                </div>
            </>
        :null}
            
        
    </>)
}

export default Channel
import Feed from "../../components/Feed/Feed"
import Subscribe from "../../components/Subscribe/Subscribe"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"



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
                <div id="ctn-header-channel">
                    <h1>{channelId}</h1>
                    <div id="ctn-subscribe">
                        <Subscribe channelId={channelId as string}/>
                    </div>
                </div>
                {videosStatus == "pending"?
                    (<div>carregando</div>)
                :null}
                {videosStatus == "error"?
                    (<div>vídeos não encontrados</div>)
                :null}
                {videosStatus == "success"?
                    <Feed videos={videosData} />
                :null}
            </>
        :null}
            
        
    </>)
}

export default Channel
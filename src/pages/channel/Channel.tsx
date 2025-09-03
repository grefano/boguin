import Feed from "../../components/Feed/Feed"
import Subscribe from "../../components/Subscribe/Subscribe"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import './channel.css'
import { useEffect, useState } from "react"



function Channel(){
    const navigate = useNavigate()
    const params = useParams()
    const channelId = params.id
    const [pageNumber, setPageNumber] = useState<number>(0)
    const [videos, setVideos] = useState<any[]>([])
    
    function fetchChannel(channelId: string){
        return fetch(import.meta.env.VITE_URL_SERVER + `/users/${channelId}`).then(res => {
            if (!res.ok){
                throw new Error(`erro fetch channel ${res.status}`)
            }
            return res.json()
        })
    } 
    function fetchVideos(channelId: string, page: number){
        return fetch(import.meta.env.VITE_URL_SERVER + `/videos/users/${channelId}?page=${page}`).then(res => {
            console.log('new videos')
            if (!res.ok){
                throw new Error(`erro fetch channel ${res.status}`)
            }
            return res.json()
        })
    } 

    
    if (channelId == undefined) {
        navigate('/', {replace: true})
    }
    
    const {status: channelStatus} = useQuery({
        queryKey: ["channel-user"],
        queryFn: () => fetchChannel(channelId as string)
    })
    
    const {status: videosStatus, data: videosData, isLoading} = useQuery({
        queryKey: ["channel-videos"],
        queryFn: () => fetchVideos(channelId as string, 0),
    })
    useEffect(() => {
        console.log('set')
        setVideos(videosData)

    }, [isLoading])
    const handleVideos = async (page: number) => {
        console.log('page', page, ' + 1 = ', page+1)
        const videos = await fetchVideos(channelId as string, page)
        console.log('videos received', videos)
        setVideos(prev => ([...prev, ...videos]))
        setPageNumber(prev => {
            return prev+1
        })
        return videos
    }

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
                    <Feed videos={videos} loading={isLoading} page={pageNumber} requestMore={handleVideos}/>
                :null}
            </>
        :null}
            
        
    </>)
}

export default Channel
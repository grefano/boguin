import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import useFetchAuth from "../../util/authfetch"

interface PropsNormal {
    demo?: false,
    channelId: string
}

interface PropsDemo {
    demo: true,
    channelId?: never,
}

type Props = PropsNormal | PropsDemo


function Subscribe({channelId, demo}: Props) {
    
    if (demo){
        return <button id="btn-subscribe" style={{'background': 'red'}}>Subscribe</button>
    }
    
    const queryClient = useQueryClient()
    const userId = localStorage.getItem('user')
    const [subscribed, setSubscribed] = useState(false)
    const fetchAuth = useFetchAuth()
    
    const fetchSubscription = async (owner: string, subject: string) => {
        const response = await fetchAuth(import.meta.env.VITE_URL_SERVER + `/subscriptions?owner_id=${owner}&subject_id=${subject}&type=all`)
        if (!response.ok){
            throw new Error(`erro fetch subscription ${response.status}`)
        }
        return response.json()
    
    } 
    
    const subscribe = async (channelId: string) => {
        //console.log('sub')
        const owner_id = localStorage.getItem('user')
        
        const response = await fetchAuth(import.meta.env.VITE_URL_SERVER + `/subscriptions?owner_id=${owner_id}&subject_id=${channelId}&type=${'all'}`, {
            method: 'POST',
        })
        if (!response.ok){
            throw new Error(`erro ao inscrever ${response.status}`)
        }

        return await response.json()
    }
    
    const unsubscribe = async (channelId: string) => {
        //console.log('unsub')
        const owner_id = localStorage.getItem('user')
        const response = await fetchAuth(import.meta.env.VITE_URL_SERVER + `/subscriptions?owner_id=${owner_id}&subject_id=${channelId}&type=${'all'}`, {
            method: 'DELETE',
        })
        if (!response.ok){
            throw new Error(`erro fetch subscription ${response.status}`)
        }
        return await response.json()
    
    }
    
    function toggle_sub(subscribed: boolean, channelId: string){
        if (subscribed){    
            return unsubscribe(channelId)
        } else {
            return subscribe(channelId)
        }
        
    }
    //console.log('Valores antes da query:', { 
    //     userId, 
    //     channelId, 
    //     serverUrl: import.meta.env.VITE_URL_SERVER 
    // })
    const {data: subData, isLoading} = useQuery({
        queryKey: ["channel-sub", userId, channelId],
        queryFn: () => {
            // //console.log('fetching sub')
            return fetchSubscription(userId as string, channelId as string)
        },
        refetchOnMount: 'always',
        enabled: !!userId && !!channelId,
        staleTime: 300
    })  
    //console.log('Query state:', { 
    //     userId, 
    //     channelId, 
    //     subData, 
    //     isLoading, 
    //     error,
    //     enabled: !!userId && !!channelId 
    // })
    //console.log(`sub data ${subData}`)
    //console.log(`sub data ${JSON.stringify(subData)}`)  

    const getIsSub = () => {
        return subData == undefined ? false : subData.subscribed
    }

    useEffect(() => {
        //console.log('useffect')
        setSubscribed(getIsSub())
    }, [subData])
    
    const {mutate } = useMutation({
        mutationFn: () => toggle_sub(subscribed, channelId),
        onSuccess: (data) => {
            //console.log('atualizar')
            //console.log(`query keys ${userId} ${channelId}`)
            // queryClient.invalidateQueries({queryKey: ["channel-sub", userId, channelId], refetchType: 'all'})
            queryClient.setQueryData(["channel-sub", userId, channelId], (oldData: any) => ({
                ...oldData,
                subscribed: data.subscribed
            }))
            //console.log(data)
            
        },
    })


    return (
    (isLoading
    ?
        <div> {isLoading}</div>   
    :
    <>
        {userId?
            <button id="btn-subscribe" className={(getIsSub() ? " active" : "")} onClick={() => mutate()}>Subscribed</button>
        :
            <button id="btn-subscribe" className={"unavailable"} >Subscribe</button>
        }
    </>)
    )
}

export default Subscribe
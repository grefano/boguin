import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

interface PropsNormal {
    demo?: false,
    channelId: string
}

interface PropsDemo {
    demo: true,
    channelId?: never,
}

type Props = PropsNormal | PropsDemo


function fetchSubscription(owner: string, subject: string){
    return fetch(import.meta.env.VITE_URL_SERVER + `/subscriptions?owner_id=${owner}&subject_id=${subject}&type=all`)
    .then(res => {
        if (!res.ok){
            throw new Error(`erro fetch subscription ${res.status}`)
        }
        return res.json()
    
    })

} 

function subscribe(channelId: string){
    console.log('sub')
    const owner_id = localStorage.getItem('user')
    return fetch(import.meta.env.VITE_URL_SERVER + `/subscriptions?owner_id=${owner_id}&subject_id=${channelId}&type=${'all'}`, {
        method: 'POST',
    }).then(res => {
        if (!res.ok){
            throw new Error(`erro ao inscrever ${res.status}`)
        }
        return res.json()
    }).then(data => {
        console.log(`data ${data}`)
        console.log(`data ${JSON.stringify(data)}`)
        return data
    })

}

function unsubscribe(channelId: string){
    console.log('unsub')
    const owner_id = localStorage.getItem('user')
    return fetch(import.meta.env.VITE_URL_SERVER + `/subscriptions?owner_id=${owner_id}&subject_id=${channelId}&type=${'all'}`, {
        method: 'DELETE',
    }).then(res => {
        if (!res.ok){
            throw new Error(`erro ao desinscrever ${res.status}`)
        }
        return res.json()
    }).then(data => {
        console.log(data)
        console.log(`data ${JSON.stringify(data)}`)

        return data
    })

}

function toggle_sub(subscribed: boolean, channelId: string){
    if (subscribed){    
        return unsubscribe(channelId)
    } else {
        return subscribe(channelId)
    }
    
}

function Subscribe({channelId, demo}: Props) {

    if (demo){
        return <button id="btn-subscribe" style={{'background': 'red'}}>Subscribe</button>
    }
    
    const queryClient = useQueryClient()
    const userId = localStorage.getItem('user')
    const [subscribed, setSubscribed] = useState(false)
    console.log('Valores antes da query:', { 
        userId, 
        channelId, 
        serverUrl: import.meta.env.VITE_URL_SERVER 
    })
    const {data: subData, isLoading, error} = useQuery({
        queryKey: ["channel-sub", userId, channelId],
        queryFn: () => {
            console.log('fetching sub')
            return fetchSubscription(userId as string, channelId as string)
        },
        refetchOnMount: 'always',
        enabled: !!userId && !!channelId,
        staleTime: 300
    })  
    console.log('Query state:', { 
        userId, 
        channelId, 
        subData, 
        isLoading, 
        error,
        enabled: !!userId && !!channelId 
    })

    console.log(`sub data ${subData}`)
    console.log(`sub data ${JSON.stringify(subData)}`)  

    const getIsSub = () => {
        return subData == undefined ? false : subData.subscribed
    }
    
    const {mutate } = useMutation({
        mutationFn: () => toggle_sub(getIsSub(), channelId),
        onSuccess: (data) => {
            console.log('atualizar')
            console.log(`query keys ${userId} ${channelId}`)
            // queryClient.invalidateQueries({queryKey: ["channel-sub", userId, channelId], refetchType: 'all'})
            queryClient.setQueryData(["channel-sub", userId, channelId], (oldData: any) => ({
                ...oldData,
                subscribed: data.subscribed
            }))
        },
        onError: (error) => {
            console.log('falha no toggle', error)
        }
    })

    return (<>
    <p>{JSON.stringify(subData)}</p>
    <p>{subscribed ?'subd':'notsubd'}</p>
    <p>{getIsSub() ? 'yes' : 'no'}</p>
    {userId?
    <button id="btn-subscribe" className={(getIsSub() ? " active" : "")} onClick={() => mutate()}>Subscribe</button>
    :
    <button id="btn-subscribe" className={"unavailable"} >Subscribe</button>
    }
    <button onClick={() => unsubscribe(channelId)}>unsub</button>
    <button onClick={() => subscribe(channelId)}>sub</button>
    </>)
}

export default Subscribe
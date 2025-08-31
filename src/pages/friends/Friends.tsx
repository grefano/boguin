
import { useQuery } from "@tanstack/react-query"
import useFetchAuth from "../../util/authfetch"
import { useAuth } from "../../AuthContext"

import './friends.css'

import type { FRIEND } from "../../util/interfaces"

import FormFriend from "../../components/FormFriend/FormFriend"
import FriendRequest from "../../components/FriendRequest/FriendRequest"
import Friend from "../../components/Friend/Friend"



function Friends() {
    const {user} = useAuth()
    const fetchAuth = useFetchAuth()



    const handleFriendSend = async (id_sender: string, id_receiver: string) => {
        const response = await fetchAuth(import.meta.env.VITE_URL_SERVER + `/friends/${id_sender}/${id_receiver}`, {
            method: 'POST'
        })
        const data = await response.json()
        console.log('response accepted')
        console.log(data)
        console.log(JSON.stringify(data))
        
    }


    const fetchRequests = async () => {
        const response = await fetchAuth(import.meta.env.VITE_URL_SERVER + `/friends?status=pending&imon=id_receiver`, {
            method: 'GET'
        })
        return await response.json()
    }

    const fetchFriends = async () => {
        const response = await fetchAuth(import.meta.env.VITE_URL_SERVER + `/friends?status=accepted`, {
            method: 'GET'
        })
        return await response.json()

    } 


    const {data: friendsData} = useQuery({
        queryKey: ["friends", "accepted"],
        queryFn: fetchFriends
    })

    const {data: requestsData, status: requestsStatus} = useQuery({
        queryKey: ["friends", "pending"],
        queryFn: fetchRequests
    })

    

    console.log('status', requestsStatus)
    console.log('data', requestsData)
    // add, requests, excluir
    return (<div id='ctn-page-friends'> 

        <FormFriend user={user as string} handleFriendSend={handleFriendSend}/>

        <h1 className="text-gg">requests</h1>
        <div id="ctn-friends-requests">
            { requestsData != undefined && requestsData.length > 0 ? requestsData.map((request: FRIEND) => (
                <FriendRequest user={user as string} handleFriendSend={handleFriendSend} request={request} />
            )) : <span>nenhum request</span>}
        </div>

        <h1 className="text-gg">friends</h1>
        <div id="ctn-friends">
            { friendsData != undefined && friendsData.length > 0 && user ? friendsData.map((friend: FRIEND) => (
                <Friend friend={friend} user={user}/>
            )) : <span>nenhum amigo</span>}
        </div>
        
    </div>)
}

export default Friends
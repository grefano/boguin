import useFetchAuth from "../../util/authfetch"
import type { FRIEND } from "../../util/interfaces"

import './friendrequest.css'

interface Props {
    request: FRIEND,
    user: string,
    handleFriendSend: (id_sender: string, id_receiver: string) => void
}



function FriendRequest({ request, user, handleFriendSend }: Props){
    const fetchAuth = useFetchAuth()
    const handleFriendDeny = async (id_sender: string) => {
        const response = await fetchAuth(import.meta.env.VITE_URL_SERVER + `/friends/${id_sender}?status=pending`, {
            method: 'DELETE'
        })
        const data = await response.json()
        console.log(data)
    }
    
    return (<div className="friend-request" key={request.id}>
        <span className="text-p">{request.id_sender}</span>
        <button className="btn-icon" onClick={() => handleFriendSend(request.id_sender, user)}><span className="icon material-symbols-outlined">check</span></button>
        <button className="btn-icon" onClick={() => handleFriendDeny(request.id_sender)}><span className="icon material-symbols-outlined">close</span></button>
    </div>)
}

export default FriendRequest
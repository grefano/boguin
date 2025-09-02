import useFetchAuth from "../../util/authfetch"
import type { FRIEND } from "../../util/interfaces"
import './friend.css'
interface Props {
    friend: FRIEND,
    user: string
}


function getOtherFromRow(user: string, row: FRIEND){
    if (row.id_sender == user){
        return row.id_receiver
    } else if (row.id_receiver == user){
        return row.id_sender
    }
}

function FriendRequest({ friend, user }: Props){
    const fetchAuth = useFetchAuth()
    
    const handleFriendDelete = async (id_sender: string) => {
        const response = await fetchAuth(import.meta.env.VITE_URL_SERVER + `/friends/${id_sender}?status=accepted`, {
            method: 'DELETE'
        })
        const data = await response.json()
        console.log('response deleted')
        console.log(data)
        console.log(JSON.stringify(data))
        
    }

    return (<div id='friend' key={friend.id}>
        <span className="text-p">{getOtherFromRow(user, friend)}</span>
        <button className="btn-icon" onClick={() => handleFriendDelete(friend.id_sender)}><span className="icon material-symbols-outlined">close</span></button>
    </div>)
}

export default FriendRequest
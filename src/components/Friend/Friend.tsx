import useFetchAuth from "../../util/authfetch"
import type { FRIEND } from "../../util/interfaces"

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
        const response = await fetchAuth(import.meta.env.VITE_URL_SERVER + `/friends/${id_sender}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        console.log('response deleted')
        console.log(data)
        console.log(JSON.stringify(data))
        
    }

    return (<div key={friend.id}>
        <div>{getOtherFromRow(user, friend)}</div>
        <button onClick={() => handleFriendDelete(friend.id_sender)}>X</button>
    </div>)
}

export default FriendRequest
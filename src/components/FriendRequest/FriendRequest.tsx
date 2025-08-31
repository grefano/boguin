import type { FRIEND } from "../../util/interfaces"

interface Props {
    request: FRIEND,
    user: string,
    handleFriendSend: (user: string, friend: string) => void
}

function FriendRequest({ request, user, handleFriendSend }: Props){

    return (<div key={request.id}>
        <div className="friend-request">{request.id_sender}</div>
        <button onClick={() => handleFriendSend(request.id_sender, user)}>O</button>
    </div>)
}

export default FriendRequest
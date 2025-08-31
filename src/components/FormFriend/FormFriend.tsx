import { useState, type FormEvent } from "react"
import { processInputUsername } from "../../util/processString"

interface Props{
    user: string,
    handleFriendSend: (user: string, friend: string) => void
}
function FormFriend({user, handleFriendSend}: Props){
    const [friend, setFriend] = useState('')


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!friend){
            return
        }
        handleFriendSend(user as string, friend)
    }
    return (<form id='form-friend-request'>
        <label htmlFor="input-friend" className="text-g">nome</label>
        <input type="text" name="" id="input-friend" onChange={(e) => setFriend(processInputUsername(e.target.value))} value={friend}/>
        <button onClick={(e) => handleSubmit(e)}>send</button>
    </form>
)}

export default FormFriend
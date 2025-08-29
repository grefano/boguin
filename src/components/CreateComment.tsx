import { useState, type FormEvent } from "react"
import { useAuth } from "../AuthContext"
import useFetchAuth from "../util/authfetch"

interface Props {
    id_video: string
}
function CreateComment({id_video}: Props){
    const [text, setText] = useState<string>('')
    const {isAuthenticated} = useAuth()
    const fetchAuth = useFetchAuth()
    
    if (!isAuthenticated){
        return <span>entre para comentar</span>
    }
    const handleText = (e: any) => {
        setText(e.target.value)
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!isAuthenticated){
            return
        }

        const response = await fetchAuth(import.meta.env.VITE_URL_SERVER + '/comments', {
            method: 'POST',
            body: JSON.stringify({
                id_video: id_video,
                text: text
            })
        })
        console.log(response)
    }
    return (<>
    <form id="form-create-comment">
        <input type="text" value={text} id="input-create-comment" onChange={handleText}/>
        <button onClick={(e) => handleSubmit(e)}>comment</button>
    </form>
    </>)
}

export default CreateComment
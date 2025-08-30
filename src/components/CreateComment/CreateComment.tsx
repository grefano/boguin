import { useState, type FormEvent } from "react"
import { useAuth } from "../../AuthContext"
import useFetchAuth from "../../util/authfetch"
import TextArea from "../TextArea"


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
    // const adjustHeight = () => {
    //     if (refTextArea.current){
    //         refTextArea.current.style.height  'auto'
    //     }
    // }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!isAuthenticated){
            return
        }
        console.log(id_video)
        const response = await fetchAuth(import.meta.env.VITE_URL_SERVER + '/comments', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id_video: id_video,
                text: text
            })
        })
        console.log(response)
    }
    return (<>
    <form id="form-create-comment">
        {/* <input type="text" value={text} id="input-create-comment" placeholder="add a comment" onChange={handleText}/> */}
        {/* <textarea value={text} id="input-create-comment" placeholder="add a comment" onChange={handleText}/> */}
        <TextArea value={text} onChange={(e) => setText(e.target.value)} width='200px' id='input-create-comment' placeholder="escreva um comentário"/>
        
        <button onClick={(e) => handleSubmit(e)}>comment</button>
    </form>
    </>)
}

export default CreateComment
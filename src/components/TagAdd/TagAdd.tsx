import { useState } from "react"
import useFetchAuth from "../../util/authfetch"
import './tagadd.css'

interface Imatch {
    rawtag: string,
    pages: object[],
    suggestion?: string
}

import type { Ipage } from '../../util/interfaces'

interface Props{
    onChoose: (tag: Ipage) => void
}

function TagAdd({onChoose}: Props){
    const [text, setText] = useState<string>('')
    const [pageId, setPageId] = useState<string | null>(null)
    const [match, setMatch] = useState<Imatch | null>(null)

    const fetchAuth = useFetchAuth()

    const requestMatch = async (tag: string) => {
        const response = await fetchAuth(import.meta.env.VITE_URL_SERVER + `/tags/match/${tag}`, {
            method: 'GET'
        })
        const data = await response.json()
        setMatch(data)
        console.log(data)

    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let tag = event.target.value
        setText(tag)
        let tagProcessed = (tag as string).replaceAll(' ', '-')
        requestMatch(tagProcessed)    
    }



    return (<form id='tag-add'>
        <input type="text" className="text-p" onChange={e => handleChange(e)} value={text}/>
        {/* <div onClick={() => console.log('cu')}>{match?.suggestion}</div> */}
        <div id='tag-pages'>
            {match ? match.pages.map((value) => (
                <span id='tag-option' className="text-p" onClick={() => onChoose(value as Ipage)}>{(value as Ipage).title}</span>
            )) : null}
        </div>
    </form>)
}


export default TagAdd
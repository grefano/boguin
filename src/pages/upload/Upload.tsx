import ButtonPage from '../../components/ButtonPage/ButtonPage'
import TagAdd from '../../components/TagAdd/TagAdd'
import { useState } from 'react'
import useFetchAuth from "../../util/authfetch"
import './upload.css'
import TextArea from '../../components/TextArea'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../AuthContext'
import TagList from '../../components/TagList/TagList'

import type { Ipage } from '../../util/interfaces'

function Upload(){
    const [title, setTitle] = useState<string>('teste')
    const [tags, setTags] = useState<Ipage[]>([])
    const [links, setLinks] = useState([])
    const [tagToSuggest, setTagToSuggest] = useState('')

    const [thumbFile, setThumbFile] = useState<File | null>(null)
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const [thumbPreview, setThumbPreview] = useState<string | null>(null)
    
    const [loading, setLoading] = useState<boolean>(false)
    
    const {user} = useAuth()
    
    const fetchAuth = useFetchAuth()
    const navigate = useNavigate()
    
    
    const handleFileThumbChange = (event: any) => {
        const file = event.target.files[0]
        console.log(file)
        if (file && file.type.startsWith('image/')) {
            setThumbFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setThumbPreview(reader.result as string)  
            }
            reader.readAsDataURL(file)
        } else {
            setThumbFile(null)
            setThumbPreview(null)
        }
    }
    const handleFileVideoChange = (event: any) => {
        const file = event.target.files[0]
        console.log(file)
        if (file && file.type.startsWith('video/')) {
            setVideoFile(file)
        } else {
            setVideoFile(null)
        }
    }

    const publishVideo = async(event: React.FormEvent) => {
        event.preventDefault()
        // if (!thumbFile || !videoFile || !title){
        //     alert('Por favor, prencha todos os campos obrigatórios.')
        // }

        setLoading(true)

        const formData = new FormData()
        formData.append('title', title)
        formData.append('thumbnail', thumbFile as File)
        formData.append('video', videoFile as File)
        formData.append('userId', user as string)
        formData.append('tags', JSON.stringify(tags) )

        try {
            
            const response = await fetchAuth(import.meta.env.VITE_URL_SERVER + '/videos', {
                method: 'POST',
                body: formData
            })
            console.log('Response:', response)
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(`Erro ao publicar video: ${errorData.message}`)
            }
            const result = await response.json()
            alert('Video publicado com sucesso')
            console.log(result)
            navigate('/dashboard')
        } catch (error: any) {
            console.error('Erro publicando video:', error)
            alert('Erro ao publicar o vídeo.' + error.message)
        } finally {
            setLoading(false)
        }
    }
    const handleTagClick = async ({pageid, title}: Ipage) => {
        const response = await fetch(import.meta.env.VITE_URL_SERVER + `/tags/links/${pageid}?page=${0}`, {
            method: 'GET'
        })
        const data = await response.json()
        setTagToSuggest(title)
        setLinks(data)
        console.log('links', data)
    }
    if (loading){
        return (<><div>loading</div></>)
    }

    const searchTag = (pageid: number, pagelist: Ipage[], fnSet: (list: Ipage[], index: number) => Ipage[]) => {
        let newpagelist = [...pagelist]
        console.log('search list', newpagelist)
        for(var i = 0; i < pagelist.length; i++){
            if (pagelist[i].pageid == pageid){
                return fnSet(pagelist, i)
            } else {
                if (pagelist[i].children){
                    newpagelist[i].children = searchTag(pageid,     pagelist[i].children as Ipage[], fnSet)
                }

            }
        }
        return newpagelist
    }

    // console.log(tags)
    const handleClickLink = (item: Ipage) => {
        const set = (list: Ipage[], index: number) => {
            var newlist = [...list]
            console.log('newlist', newlist, 'pageid', item.pageid)
            
            // if (list.some((value) => value.pageid == item.pageid)) return newlist;
            if (newlist[index].children?.some((value) => value.pageid == item.pageid)) return newlist;

            if (newlist[index].children){
                newlist[index].children.push(item)
            } else {
                newlist[index].children = [item]
            }
            return newlist
        }
        setTags((prev) => searchTag(item.parent as number, prev, set))
    }
    const handleRemoveTag = (pageid: number) => {
        const set = (list: Ipage[], index: number) => {
            var newlist = [...list]
            newlist.splice(index, 1)
            return newlist
        }
        setTags((prev) => searchTag(pageid, prev, set))
    }
    return (
        <>
            <nav id='buttons'>
                <ButtonPage id='btn-upload' link='/'> Home </ButtonPage>
            </nav>
            <form onSubmit={publishVideo} id='form-upload'>
                <div id='ctn-upload-input-files'>
                    <label className='input-file' htmlFor='form-input-thumbnail'>
                        {thumbPreview ? <img src={thumbPreview as string} alt="" style={{'width': '100%'}}/> : null}
                        <input id='form-input-thumbnail' type="file" accept='image/*' onChange={handleFileThumbChange}/>
                        <span className='text-p'>clique para selecionar thumbnail</span>
                    </label>
                    <label className='input-file' htmlFor='form-input-video'>
                        <input id='form-input-video' type="file" accept='video/mp4' onChange={handleFileVideoChange}/>
                        <span className='text-p'>{videoFile ? videoFile.name : 'clique para selecionar video'}</span>
                    </label>
                </div>
                <label className='input-text' htmlFor='form-input-title'>
                    <span className='text-p'> title </span>
                    {/* <input id='form-input-title' type="text" defaultValue={title} onChange={e => setTitle(e.target.value)} maxLength={100}/> */}
                    <div id='ctn-upload-title-publish'>
                        <TextArea className='text-p' id='form-input-title' value={title} onChange={e => (setTitle(e.target.value))} maxLength={100} spellCheck='false'/>
                        <button className='text-p' onClick={publishVideo}>Publish</button>
                    </div>
                </label>
            </form>
            <div id='ctn-upload-tags' >
                <TagList handleClick={(page: Ipage) => handleTagClick(page)} handleRemove={(id: number) => handleRemoveTag(id)} tags={tags}/>
                <div>
                    <h2>relacionados à {tagToSuggest}</h2>
                    <div id='tag-pages' style={{'display': 'flex', 'flexDirection': 'column'}}>
                        {links ? links.map((item: Ipage)  => (
                            <div id='tag-option' className='text-p' onClick={() => handleClickLink(item)} style={{'borderWidth': '2px', 'borderStyle': 'none none solid none', 'borderColor': 'black'}}>{item.title}</div>
                        )) : null}
                    </div>
                </div>
                <TagAdd onChoose={(tag: Ipage) => setTags((prev) => [...prev, tag])}/>
            </div>
        </>
    )
}

export default Upload
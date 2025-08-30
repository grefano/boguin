import ButtonPage from '../../components/ButtonPage/ButtonPage'
import { useState } from 'react'
import useFetchAuth from "../../util/authfetch"
import './upload.css'
import TextArea from '../../components/TextArea'
import { useNavigate } from 'react-router-dom'

function Upload(){
    const [thumbFile, setThumbFile] = useState<File | null>(null)
    const [thumbPreview, setThumbPreview] = useState<string | null>(null)
    const [title, setTitle] = useState<string>('teste')

    const [videoFile, setVideoFile] = useState<File | null>(null)

    const [loading, setLoading] = useState<boolean>(false)

    const userId = localStorage.getItem('user')
    
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
        if (!thumbFile || !videoFile || !title){
            alert('Por favor, prencha todos os campos obrigatórios.')
        }

        setLoading(true)

        const formData = new FormData()
        formData.append('title', title)
        formData.append('thumbnail', thumbFile as File)
        formData.append('video', videoFile as File)
        formData.append('userId', userId as string)

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
    if (loading){
        return (<><div>loading</div></>)
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
                        <TextArea className='text-p' id='form-input-title' value={title} onChange={e => setTitle(e.target.value)} maxLength={100} spellCheck='false'/>
                        <button className='text-p' onClick={publishVideo}>Publish</button>
                    </div>
                </label>
            </form>
        </>
    )
}

export default Upload
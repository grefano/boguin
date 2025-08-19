import ButtonPage from './components/ButtonPage'
import { useState } from 'react'

function Upload(){
    const [thumbFile, setThumbFile] = useState<File | null>(null)
    const [thumbPreview, setThumbPreview] = useState<string | null>(null)
    const [title, setTitle] = useState<string>('teste')

    const [videoFile, setVideoFile] = useState<File | null>(null)

    const [loading, setLoading] = useState<boolean>(false)

    const userId = '1'
    const handleFileThumbChange = (event: any) => {
        const file = event.target.files[0]
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
            const response = await fetch(import.meta.env.VITE_URL_SERVER + '/videos', {
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
        } catch (error: any) {
            console.error('Erro publicando video:', error)
            alert('Erro ao publicar o vídeo.' + error.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <nav id='buttons'>
                <ButtonPage id='btn-upload' link='/'> Home </ButtonPage>
            </nav>

            <form onSubmit={publishVideo}>

                {/* <div id='container-upload-thumbnail'> */}
                    {/* <h2>Thumbnail</h2> */}
                    <label>
                        <input type="file" accept='image/*' onChange={handleFileThumbChange}/>
                    </label>
{/* 
                    { thumbPreview ?
                        <img className='thumb-preview' src={thumbPreview} /> : null
                    } */}
                {/* </div> */}

                {/* <div id='container-upload-video'> */}
                    {/* <h2>Video File</h2> */}
                    <label>
                        
                        <input type="file" accept='video/*' onChange={handleFileVideoChange}/>
                        
                    </label>
                {/* </div> */}
                <label>
                    <input type="text" defaultValue={title} onChange={e => setTitle(e.target.value)}/>
                </label>
            </form>
            <button onClick={publishVideo}>Publish</button>
        </>
    )
}

export default Upload
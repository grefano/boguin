import { useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom'

interface TypeInputsErrorMsg {
    username: string | null,
    password: string | null
}

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [inputsErrorMsg, setInputsErrorMsg] = useState<TypeInputsErrorMsg>({username: null, password: null})

    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('useeffect')
        if (isAuthenticated){
            console.log('voltando mesmo')
            navigate('/', {replace: true})
            
        }

    })
    const processInputUsername = (val: string) => {
        const newval = val.toLowerCase().replace(/[^a-z]/g, '')
        console.log(newval)
        return newval
    }
    const processInputPassword = (val: string) => {
        const newval = val.toLowerCase().replace(/[^a-z0-9#@_-]/g, '')
        console.log(newval)
        return newval
    }
    const handlePassword = (e: any) => {
        setInputsErrorMsg({
            ...inputsErrorMsg,
            password: null
        })
        setPassword(processInputPassword(e.target.value))
    }
    const handleUsername = (e: any) => {
        setInputsErrorMsg({
            ...inputsErrorMsg,
            username: null
        })
        setUsername(processInputUsername(e.target.value))
    }

    const handleSubmit = async (event: React.FormEvent, endpoint: 'login' | 'register') =>{
        event.preventDefault()
        if (!username || !password){
            return;
        }

        console.log('vai enviar')
        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)

        const response = await fetch(import.meta.env.VITE_URL_SERVER + '/auth/' + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        console.log(await response)
        if (response.ok) {
            console.log('login sucessful')
            const data = await response.json()
            console.log(data)
            login(data.token, username)
            console.log('vorta pra dashbord')
            
            
        } else {
            console.log(response.status)
            if (response.status == 409){
                // ja existe um usuario com esse nome
                const data = await response.json()
                console.log(data)
                setInputsErrorMsg(({
                    ...inputsErrorMsg,
                    username: data.error
                }))
            } else if (response.status == 401) {
                const data = await response.json()
                console.log(data)
                setInputsErrorMsg(({
                    ...inputsErrorMsg,
                    password: data.error
                }))
            } else {
                const data = await response.json()
                console.error('Login failed:', data.error   )
            }

        }
    }
    return (
        <div id="ctn-login">
        <h1>Login</h1>
        <form id="form-login">
            <div>
                <label htmlFor="fuser">username:</label>
                <input pattern="[a-z]+" type="text" name="" value={username} id="fuser" placeholder="unique username" onChange={handleUsername}/>
            </div>
            <div className='form-error'>{inputsErrorMsg.username}</div>
            <div>
                <label htmlFor="fpassword">password:</label>
                <input pattern="[a-z]+" type="text" name="" value={password} id="fpassword" placeholder="password" onChange={handlePassword}/>
                
            </div>
            <div className='form-error'>{inputsErrorMsg.password}</div>
            <div id="ctn-login-buttons">
                <button onClick={(e) => handleSubmit(e, 'login')}>Entrar</button>
                <button onClick={(e) => handleSubmit(e, 'register')}>Criar conta</button>
            </div>
        </form>

        </div>
    )
}

export default Login
import { useEffect, useState } from 'react'
import { useAuth } from '../../AuthContext'
import { useNavigate } from 'react-router-dom'
import './login.css'

interface TypeInputsErrorMsg {
    username: string | null,
    password: string | null
}

import { processInputUsername } from '../../util/processString'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [inputsErrorMsg, setInputsErrorMsg] = useState<TypeInputsErrorMsg>({username: null, password: null})
    const [accountMsg, setAccountMsg] = useState<string | null>(null)
    
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    
    const seterrormsg = (obj: Object) => {
        setInputsErrorMsg(prevState => ({
            ...prevState,
            ...obj
        }))
    }
    const handleRegister = async () => {
        const response = await fetch(import.meta.env.VITE_URL_SERVER + '/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        console.log(response)
        if (response.ok){
            console.log('set msg')
            setAccountMsg('Conta criada com sucesso')
            const data = await response.json()
            login(data.token, username)
        } else {
            // const data = await response.json()
            // setAccountMsg(`Conta não foi criada, ${data}`)
            switch (response.status){
                case 409:
                    seterrormsg({username: 'Já existe uma conta com esse nome de usuário'})
                    break;
                default:
                    console.error('Registration failed', (await response.json()).error)
            }
    
        }

    }
    const handleLogin = async () => {
        const response = await fetch(import.meta.env.VITE_URL_SERVER + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        if (response.ok) {
            console.log('login sucessful')
            const data = await response.json()
            console.log(data)
            login(data.token, username)
            console.log('vorta pra dashbord')
            
            
        } else {
            switch (response.status){
                case 401:
                    seterrormsg({password: (await response.json()).error})
                    break;
                default:
                    console.error('Login failed', (await response.json()).error)
            }
    
        }
    }
    useEffect(() => {
        console.log('useeffect')
        if (isAuthenticated){
            console.log('voltando mesmo')
            navigate('/', {replace: true})
            
        }

    })
    
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

    const handleSubmit = async (event: React.FormEvent, fnFetch: () => void) =>{
        event.preventDefault()
        if (!username || !password){
            return;
        }

        console.log('vai enviar')
        fnFetch()
        
    }
    return (
        <div id="ctn-login">
        <h1 className='text-gg'>Login</h1>
        <form id="form-login">
            {accountMsg ? (<div className='form-feedback'>{accountMsg}</div>) : null}
            <div>
                <label htmlFor="fuser" className='text-m'>username:</label>
                <input pattern="[a-z]+" className='text-p' type="text" name="" value={username} id="fuser" placeholder="unique username" onChange={handleUsername}/>
            </div>
            <div className='form-error'>{inputsErrorMsg.username}</div>
            <div>
                <label htmlFor="fpassword" className='text-m'>password:</label>
                <input pattern="[a-z]+" className='text-p' type="text" name="" value={password} id="fpassword" placeholder="password" onChange={handlePassword}/>
                
            </div>
            <div className='form-error'>{inputsErrorMsg.password}</div>
            <div id="ctn-login-buttons">
                <button onClick={(e) => handleSubmit(e, handleLogin)}>Entrar</button>
                <button onClick={(e) => handleSubmit(e, handleRegister)}>Criar conta</button>
            </div>
        </form>

        </div>
    )
}

export default Login
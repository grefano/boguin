import { useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        console.log('useeffect')
        if (isAuthenticated){
            console.log('voltando mesmo')
            navigate('/dashboard', {replace: true})
            
        }

    })
    
    const handleSubmit = async (event: React.FormEvent, endpoint: 'login' | 'register') =>{
        event.preventDefault()

        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)

        const response = await fetch(import.meta.env.VITE_URL_SERVER + '/' + endpoint, {
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
        const data = await response.json()
        if (response.ok) {
            localStorage.setItem('token', data.token)
            console.log('login sucessful')
            console.log(data)
            login(data.token)
            console.log('vorta pra dashbord')
           
            
        } else {
            console.error('Login failed:', data.error   )
        }
    }
    return (
        <>
        <h1>Login</h1>
        <form>
            <div>
                
                <label htmlFor="fuser">username</label>
                <input type="text" name="" id="fuser" placeholder="tiaoiha" onChange={(e) => setUsername(e.target.value)}/>
                
            </div>
            <div>
                <label htmlFor="fpassword">password</label>
                <input type="text" name="" id="fpassword" placeholder="awdawdd" onChange={(e) => setPassword(e.target.value)}/>
                
            </div>
            <button onClick={(e) => handleSubmit(e, 'login')}>Entrar</button>
            <button onClick={(e) => handleSubmit(e, 'register')}>Criar conta</button>
        </form>

        </>
    )
}

export default Login
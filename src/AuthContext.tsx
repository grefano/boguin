import { createContext, useEffect, useState, useContext } from 'react'

interface TypeAuthContext {
    user: string | null
    token: string | null
    login: (newToken: string) => void
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<TypeAuthContext | null>(null)

export function useAuth () {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}


interface PropsAuthProvider {
    children: React.ReactNode
}
export function AuthProvider ({ children }: PropsAuthProvider) {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const savedToken = localStorage.getItem('token')
        if (savedToken){
            validateToken(savedToken)
            setToken(savedToken)
        }
    }, [])


    const validateToken = async (token: string) => {
        try {
            console.log(import.meta.env.VITE_URL_SERVER + '/verify-token')
            const response = await fetch(import.meta.env.VITE_URL_SERVER + '/verify-token', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.ok) {
                const userData = await response.json()
                setUser(userData.user)
            }
        } catch (error) {

        }
    }

    const login = (newToken: string) => {
        console.log('fazendo login')
        localStorage.setItem('token', newToken)
        setToken(newToken)
        //setuser
    }

    const logout = () => {
        console.log('fazendo logout')
        localStorage.removeItem('token')
        setToken(null)
        //setuser null  
    }

    console.log(`isauthenticated = ${!!user} && ${!!token}`)
    const isAuthenticated = !!token
    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
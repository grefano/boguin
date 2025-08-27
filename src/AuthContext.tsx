import { createContext, useEffect, useState, useContext } from 'react'

interface TypeAuthContext {
    user: string | null
    token: string | null
    login: (newToken: string, user: string) => void
    logout: () => void
    isAuthenticated: boolean
    isLoading: boolean
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

    const [user, setUser] = useState<string | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkToken = async () => {
            const savedToken = localStorage.getItem('token')
            if (savedToken){
                const isValid = await isTokenValid(savedToken)
                if (isValid){
                    setUser(localStorage.getItem('user'))
                    setToken(savedToken)
                } else {
                    logout()
                }
            } else {
                setIsLoading(false)
            }
        }
        checkToken()
    }, [])


    const isTokenValid = async (token: string) => {
        try {
            const response = await fetch(import.meta.env.VITE_URL_SERVER + '/auth/verify-token', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setIsLoading(false)
            return response.ok
        } catch (error) {
            console.error('erro ao validar token', error)
            return false

        } 
    }

    const login = (newToken: string, user: string) => {
        localStorage.setItem('token', newToken)
        localStorage.setItem('user', user)
        setToken(newToken)
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
        setUser(null)  
    }

    const isAuthenticated = !!user && !!token
    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated,
        isLoading
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
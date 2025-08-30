import { useAuth } from "../AuthContext"

const useFetchAuth = () => {
    const {token, logout} = useAuth()
    const fetchAuth = async (url: string, options: RequestInit = {}) => {
        if (!token){
            throw new Error('usuário não autenticado')
        }
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${token}`
                
            }
        })

        if (response.status == 401) {
            logout()
            throw new Error('sessão expirada')
        } 
        return response
    }
    return fetchAuth
}

export default useFetchAuth
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

interface Props {
    children: React.ReactNode
}
export function ProtectedRoute({children}: Props) {
    const {isAuthenticated, isLoading} = useAuth()
    if (isLoading){
        return <div>carregando</div>
    }
    if (!isAuthenticated){
        console.log('não autenticado')
        return <Navigate to={"/login"} replace />
    }
    return <>{children}</>
}
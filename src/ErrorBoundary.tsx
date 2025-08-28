import React from 'react'

interface PropsErrorBoundary{
    fallback?: React.ReactNode,
    children: React.ReactNode
}

interface StateErrorBoundary{
    hasError: boolean
}

class ErrorBoundary extends React.Component<PropsErrorBoundary, StateErrorBoundary>{
    state = { hasError: false}
    
    static getDerivedStateFromError(error: Error) {
        return {hasError: true}
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log(error, errorInfo)
    }

    render () {
        if (this.state.hasError){
            return this.props.fallback || <div>algo deu errado</div>
        } else {
            return this.props.children
        }
    }
}


export default ErrorBoundary
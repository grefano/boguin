import { useEffect, useRef } from "react"

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
    value: string,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    width: string
}
function TextArea({value, onChange, ...props}: Props){
    const refTextArea = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        console.log('muda')
        const textarea = refTextArea.current
        if (textarea){
            textarea.style.height = 'auto'
            textarea.style.height = `${textarea.scrollHeight}px`
        }
    }, [value])

    return (<textarea {...props} ref={refTextArea} value={value} onChange={onChange} style={{
        resize: 'none',
        overflow: 'hidden',
        minHeight: '40px'
    }}/>)
}

export default TextArea
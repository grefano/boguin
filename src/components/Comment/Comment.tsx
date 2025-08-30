interface Props{
    id_user: string,
    created_at: string,
    children: string
}
const convertToBrasilTime = (utcDate: string): string => {
    return new Date(utcDate).toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })
}
function Comment({id_user, created_at, children}: Props){

    return (<div id="comment">
        <div id='comment-header' className="text-p">
            <p id="comment-username" >{id_user}</p>
            <p id="comment-time">{convertToBrasilTime(created_at)}</p>
        </div>
        <p id="comment-text" className="text-m">{children}</p>
    </div>)
}

export default Comment
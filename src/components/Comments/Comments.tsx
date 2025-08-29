interface Props{
    comments: any[]
}
import Comment from '../Comment/Comment'


function Comments({comments}: Props){
    return (<div id='ctn-comments'>
        {comments.map((comment) => (
            <Comment id_user={comment.id_user} created_at={comment.created_at}>{comment.text}</Comment>
        ))}
    </div>)
}

export default Comments
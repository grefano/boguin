import './taglist.css'

import type { Ipage } from '../../util/interfaces'

interface Props{
    tags: Ipage[],
    handleRemove: (id: number) => void,
    handleClick: (page: Ipage) => void
}
function TagList({tags, handleRemove, handleClick}: Props){
    console.log('tags list', tags)
    return (<div id='tag-list'>
        {tags.map(value => (
            <div id='tag'>
                <span className='text-p' onClick={() => handleClick(value)}>
                    {value.title}
                </span> 
                <button className='btn-icon' onClick={() => handleRemove(value.pageid)}><span className='icon material-symbols-outlined'>close</span></button>
            </div>
        ))}
    </div>)
}
export default TagList
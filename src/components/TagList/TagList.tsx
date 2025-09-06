import './taglist.css'

import type { Ipage } from '../../util/interfaces'

interface Props{
    tags: Ipage[],
    handleRemove: (id: number) => void,
    handleClick: (page: Ipage) => void
}
function TagList({tags, handleRemove, handleClick}: Props){
    function Tag({title, pageid, parent, children}: Ipage){
        return (<div id='ctn-tag'>
            <div id='tag'>
                <span className='text-p' onClick={() => handleClick({pageid, title})}>
                    {title} - {pageid}
                </span> 
                <button className='btn-icon' onClick={() => handleRemove(pageid)}><span className='icon material-symbols-outlined'>close</span></button>
            </div>
            <div id='ctn-tag-children'>
                {children ? children.map(child => (
                    <Tag title={child.title} pageid={child.pageid} parent={pageid} children={child.children} />
                )) : null}
            </div>
        </div>)
    }
    console.log('tags list', tags)
    return (<div id='tag-list'>
        {tags.map(value => (
            <Tag {...value}/>
        ))}
    </div>)
}
export default TagList
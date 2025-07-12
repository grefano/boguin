
import ButtonPage from './components/ButtonPage'
import VideoPlayer from './components/VideoPlayer'

function Watch() {
    return (
        <>
            <VideoPlayer></VideoPlayer>
            <nav id='buttons'>
                <ButtonPage id='btn-upload' link='/'> Home </ButtonPage>
            </nav>
        </>
    )
}
export default Watch
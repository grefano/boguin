import Video from './components/Video'



function App() {
  return (
  <>
    <nav id='buttons'>
      <button>Upload</button>
    </nav>
    <div id='feed'>


      <Video title='titulo legal 1' thumbnail='src\imgs\thumbnail120p.png'></Video>
      <Video title='titulo legal 2' thumbnail='src\imgs\thumbnail720.png'></Video>
      <Video title='joguei o anão da sacada (ele morreu?)' thumbnail='src\imgs\thumbnail120p.png'></Video>
      <Video title='titulo legal 4' thumbnail='src\imgs\thumbnail720.png'></Video>
    </div>
  </>)
}

export default App;
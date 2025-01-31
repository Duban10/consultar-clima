import style from './App.module.css'
import Form from './components/Form/Form'

function App() {

  return (
    <>
      <h1 className={style.title}>hola</h1>
      <div className={style.container}>
        <p><Form /></p>
        <p>2</p>
      </div>
    </>
  )
}

export default App

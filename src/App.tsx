import style from './App.module.css'
import Alert from './components/Alert/Alert'
import Form from './components/Form/Form'
import useWeather from './components/Hook/useWeather'
import Spinner from './components/Spinner/Spinner'
import WeatherDeatails from './components/weatherDeatils/WeatherDeatails'

function App() {
  const {fetchWeather, notFound, weather, hasWeatherData, loading} = useWeather()

  return (
    <>
      <h1 className={style.title}>Buscador de clima</h1>
      <div className={style.container}>
        <p><Form fetchWeather={fetchWeather} /></p>
        { loading && <Spinner /> }
        { hasWeatherData && <WeatherDeatails weather={weather} /> }
        { notFound && <Alert>Ciudad no encontrada</Alert> }
      </div>
    </>
  )
}

export default App

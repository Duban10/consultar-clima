import { Weather } from "../Hook/useWeather";
import { formatTemp } from "../utils";
import styles from './WeatherDeatails.module.css'

export default function WeatherDeatails({weather}: {weather: Weather}) {

    console.log('wea', weather)
    return (
        <div className={styles.container}>
            <h2>Clima de: {weather.name}</h2>
            <p className={styles.current}>{ formatTemp(weather.main.temp) }</p>
            <div className={styles.temperatures}>
                <p>Min: <span> { formatTemp(weather.main.temp_min) }</span></p>
                <p>Max: <span> { formatTemp(weather.main.temp_max) }</span></p>
            </div>
        </div>
    )
}

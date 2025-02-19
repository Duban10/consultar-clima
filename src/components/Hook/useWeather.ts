import axios from "axios";
import { SearchType, 
  // Weather 
} from "../../types";
import { z } from 'zod' // MUY PESADO
import { useMemo, useState } from "react";
// import { InferOutput, number, object, parse, string } from "valibot";


// Type Guard
// const isWeatherResponse = (weather: unknown) : weather is Weather => {
//   return (
//     Boolean(weather) &&
//     typeof weather === 'object' &&
//     typeof (weather as Weather).name === 'string' &&
//     typeof (weather as Weather).main.temp === 'number' &&
//     typeof (weather as Weather).main.temp_min === 'number' &&
//     typeof (weather as Weather).main.temp_max === 'number'
//   )
// }


// Zod
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
  })
})
export type Weather = z.infer<typeof Weather>


// Valibot
// const weatherSchema = object({
//   name: string(),
//   main: object({
//     temp: number(),
//     temp_min: number(),
//     temp_max: number(),
//   })
// })

// type Weather = InferOutput<typeof weatherSchema>

export default function useWeather() {

  const [weather, setWeather] = useState({
    name: '',
    main: {
      temp: 0,
      temp_min: 0,
      temp_max: 0,
    }
  })

  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const initialState  ={
    name: '',
    main: {
      temp: 0,
      temp_min: 0,
      temp_max: 0,
    }
  }

  const fetchWeather = async(search: SearchType) => {
      setLoading(true)
      setWeather(initialState)
      try {
        const apiKey = import.meta.env.VITE_API_KEY
        const getUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiKey}`

        const {data} = await axios(getUrl)

        if(!data[0]){
          setNotFound(true)
          return
        }

        const lat = data[0].lat
        const lon = data[0].lon

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

        // castear el type
        // const {data : weatherResult} = await axios<Weather>(weatherUrl)
        // console.log(weatherResult.name);

        // Type Guard
        // const {data : weatherResult} = await axios(weatherUrl)
        // const result = isWeatherResponse(weatherResult)
        // if(result){
        //   console.log(weatherResult.name);
        // }else{
        //   console.log("Respuesta mal formada");          
        // }

        // Zod
        const {data : weatherResult} = await axios(weatherUrl)
        const result = Weather.safeParse(weatherResult)
        if(result.success){
          console.log(result);
          setWeather(result.data)
        }else{
          console.log("Respuesta mal formada");          
        }

        // valibot 
        // const {data : weatherResult} = await axios(weatherUrl)
        // const result = parse(weatherSchema, weatherResult)
        // if(result){
        //   console.log(result);
        // }else{
        //   console.log("Respuesta mal formada");          
        // }        
        
      } catch (error) {
        console.log(error);
        
      } finally {
        setLoading(false)
      }
      
  }

  const hasWeatherData = useMemo(() => weather.name, [weather])
  
  return {
    fetchWeather,
    notFound,
    weather,
    hasWeatherData,
    loading
  }
}

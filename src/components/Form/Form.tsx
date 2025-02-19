import { useState } from "react";
import { countries } from "../../data/countries";
import style from "./Form.module.css";
import { SearchType } from "../../types";
import Alert from "../Alert/Alert";

interface PropsFetchWeather {
  fetchWeather: (search: SearchType) => Promise<void>
}

export default function Form({fetchWeather}: PropsFetchWeather) {

  const [search, setSearch] = useState<SearchType>({
    city: '',
    country: ''
  })
  const [alert, setAlert] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(Object.values(search).includes('')) {
      setAlert('Todos los campos son obligatorios')
      return
    }

    fetchWeather(search)


  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <Alert>{alert}</Alert>
      <div className={style.field}>
        <label htmlFor="city">Ciudad:</label>
        <input type="text" id="city" name="city" placeholder="Ciudad" onChange={handleChange} />
      </div>
      <div className={style.field}>
        <label htmlFor="country">País:</label>
        <select name="country" id="country" onChange={handleChange}>
          <option value="">Selecciona un país</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <input className={style.submit} type="submit" value="Consultar Clima" />
    </form>
  );
}

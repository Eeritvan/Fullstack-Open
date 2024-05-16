import axios from 'axios'

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"

const getAllCountries = () =>
    axios.get(baseUrl).then(response => response.data)

const filterCountries = (data, keyword) => {
    const Match = data.find(x => x.name.common.toLowerCase() === keyword.toLowerCase())
    if (Match) { return [Match] }
    
    return data.filter(x => x.name.common.toLowerCase().includes(keyword.toLowerCase()))
  }

const getCapitalWeather = (lat, lon) => {
    const key = import.meta.env.VITE_SOME_KEY
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`

    return axios
    .get(weatherUrl)
    .then(response => response.data)
    .then(response => ({ temp: response.main.temp,
                         windSpeed: response.wind.speed,
                         icon: response.weather[0].icon
                      }))
}

const getIcon = icon => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

export default { getAllCountries, filterCountries, getCapitalWeather, getIcon }
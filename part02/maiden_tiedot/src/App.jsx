import { useState, useEffect } from 'react'
import countries from './services/countries'

const Search = ({value, onChange}) => (
  <div>
    find countries: <input value={value} onChange={onChange} />
  </div>
)

const SearchResults = ({countries, showButton}) => {
  if (!countries || countries.length > 10) {
    return <SearchFailure message="Too many matches, specify another filter"/>
  }
  if (countries.length === 1) {
    return <SingleResult country={countries[0]} />
  }
  return countries.length 
    ? countries.map(country => <ResultList key={country.name.common} country={country.name.common} showButton={showButton}/>)
    : <SearchFailure message="No results" />
}

const SearchFailure = ({message}) => <div>{message}</div>

const ResultList = ({country, showButton}) => 
  <div>
    {country}
    <button onClick={showButton(country)}>show</button>
  </div>

const SingleResult = ({country}) => (
  <div>
    <h1> {country.name.common} </h1>
    <div> capital: {country.capital}</div>
    <div> area: {country.area}</div>
    <h3> languages: </h3>
    <ul>
      {Object.values(country.languages).map(x => <LanguageList key={x} language={x} />)}
    </ul>
    <img src={country.flags.png}/>
    {console.log(country)}
    <Weather capital={country.capital} lat={country.capitalInfo.latlng[0]} lon={country.capitalInfo.latlng[1]} />
  </div>
)

const LanguageList = ({language}) => <li>{language}</li>

const Weather = ({capital, lat, lon}) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countries.getCapitalWeather(lat, lon)
      .then(response => setWeather(response))
  }, [])

  if (!weather) {
    return <div>Loading weather...</div>
  }


  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature: {weather.temp} Celcius</p>
      <img src={countries.getIcon(weather.icon)}/>
      <p>Wind Speed: {weather.windSpeed} m/s</p>
    </div>
  )
}

const App = () => {
  const [keyword, setKeyword] = useState("")
  const [allData, setAllData] = useState([])
  const [results, setResults] = useState(null)

  useEffect(() => {
    countries
      .getAllCountries()
      .then(response => setAllData(response))
  }, [])

  const updateKeyword = event => {
    setKeyword(event.target.value)
    setResults(countries.filterCountries(allData, event.target.value))
  }

  const showButton = country => () => updateKeyword({ target: { value: country } })

  return (
    <div>
      <Search value={keyword} onChange={updateKeyword}/>
      <SearchResults countries={results} showButton={showButton}/>
    </div>
  )
}

export default App
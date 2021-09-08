import { useState, useEffect } from "react";
import countryService from "./services/countries"

const Country = ({country}) => {
  const [temperature, setTemp] = useState("")
  const [wind, setWind] = useState("")
  const [icon, setIcon] = useState("")
  useEffect(() => {
    countryService
      .getWeather(country.capital)
      .then(response=>
        {
          setTemp(response.temperature)
          setWind(`${response.wind_speed} mph, direction ${response.wind_dir}`)
          setIcon(response.weather_icons[0])
        })
  }, [])

  if(country===undefined){
    return <></>
  }
  else return(
  <div key={country.name}>
  <h1>{country.name}</h1>
  <p>Capital: {country.capital}</p>
  <p>Population: {country.population}</p>
  <img className="flag" src={country.flag} alt="flag"></img>
  <h2>Languages</h2>
  <ul>
    {country.languages.map(language=><li key={language.name}>{language.name}</li>)}
  </ul>
  <h2>Weather in {country.capital}</h2>
  <p><b>Temperature: </b>{temperature} Celcius</p>
  <img src={icon} alt="weather icon"></img>
  <p><b>Wind: </b>{wind}</p>
  </div>
  )
}
const Countries = ({countries, setMatching}) => {
  if(countries.length===0){
    return(<></>)
  }
  else if(countries.length>10){
    return(<div>Too many matches, specify another filter.</div>)
  }
  else if(countries.length>1){
    return(
      countries.map(country => 
      <div key={country.name}>
        <>{country.name}</>
        <button key={country.name} onClick={()=>setMatching(country)}>show</button>
      </div>
    )
     )
  }
  else if(countries.length===1){
    return(<div>
      <Country key={countries[0]} country={countries[0]}></Country>
  </div>)
  }
  else 
  // countries.length is undefined so that means countries is a single object, not an array of objects
  {
      return(
        <div>
          <Country key={countries} country={countries}></Country>
      </div>
      )
  }
}



const App=() => {
  const [allCountries, setCountries]=useState([])
  const [searched, setSearched] = useState("")
  const [matching, setMatching] = useState([])
  useEffect(() => {
    countryService
      .getAll()
      .then(allCountries=>{
        setCountries(allCountries)
      })
  }, [])
  
  const findCountry=(searched)=>{
   setMatching(allCountries.filter(country => country.name.toUpperCase().search(searched.toUpperCase())!==-1))
  }
  const handleSearchedChange= (event)=>{
    setSearched(event.target.value)
    findCountry(event.target.value)
  }

  return (
    <div>
      <input value={searched}
        onChange={handleSearchedChange}>
      </input>
      <Countries countries={matching} setMatching={setMatching}></Countries>
    </div>
  );
}

export default App;

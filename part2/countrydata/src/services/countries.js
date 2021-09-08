import axios from "axios"
const baseUrl= "https://restcountries.eu/rest/v2/all"
const weatherUrl= "http://api.weatherstack.com/current"

const getAll= () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getWeather = (capital) => {
    const api_key = process.env.REACT_APP_API_KEY
    const url= `${weatherUrl}?access_key=${api_key}&query=${capital}`
    const request = axios.get(url)
    return request.then(response => response.data.current)
}
export default {getAll, getWeather}
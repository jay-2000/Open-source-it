let city = document.getElementById("city")
let country = document.getElementById("country")
let weather = document.getElementById("weather")
let temp = document.getElementById("temp")
let wind = document.getElementById("wind")
let humidity = document.getElementById("humidity")
let pressure = document.getElementById("atmpressure")
let searchInput = document.getElementById("search")
let searchButton = document.getElementById("searchButton")
let weatherIcon = document.getElementById("weather-icon")
const API_KEY = "a9d27289f77c0b7f208946e0c78db9b3";

const updateWeatherIcon = (weather) => {
    const clear = './Assets/clear.png'
    const cloudy = './Assets/cloudy.png'
    const haze = './Assets/haze.png'
    const lightining = './Assets/lightining.png'
    const rain = './Assets/rain.png'
    const snow = './Assets/snow.png'
    const windy = './Assets/windy.png'
    const mist = './Assets/mist.png'
    const sunnyCloudy = './Assets/sunny-cloudy.png'
    switch (weather) {
        case "Clear":
            weatherIcon.src = clear
            break;
        case "Clouds":
            weatherIcon.src = cloudy
            break;
        case "Haze":
        case "Smoke":
            weatherIcon.src = haze
            break;
        case "Lightining":
            weatherIcon.src = lightining
            break;
        case "Rain":
            weatherIcon.src = rain
            break;
        case "Snow":
            weatherIcon.src = snow
            break;
        case "Windy":
            weatherIcon.src = windy
            break;
        case "Mist":
            weatherIcon.src = mist
            break;
        default:
            weatherIcon.src = sunnyCloudy
            break;
    }
}

const getWeatherData = (reqCity) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${reqCity}&units=metric&appid=${API_KEY}`)
        .then((res) => res.json())
        .then((res) => {
            if (res.cod === "404") {
                alert(res.message)
                searchInput.value = ""
                searchButton.innerHTML = ` <i class="fa-solid fa-magnifying-glass"></i>`
            } else {
                const { name, sys, weather, main, wind } = res;
                updateWeatherIcon(res.weather[0].main)
                city.innerHTML = name;
                country.innerHTML = sys.country
                weather.innerHTML = weather[0].main
                temp.innerHTML = Math.round(main.temp)
                wind.innerHTML = wind.speed
                humidity.innerHTML = main.humidity
                pressure.innerHTML = main.pressure
                searchInput.value = ""
                searchButton.innerHTML = ` <i class="fa-solid fa-magnifying-glass"></i>`
            }
        })
        .catch((error) => {
            alert(error)
            searchInput.value = ""
            searchButton.innerHTML = ` <i class="fa-solid fa-magnifying-glass"></i>`
        })
}

const handleSubmit = () => {
    if (searchInput.value.trim() === "") {
        alert("Search field cannot be Empty!")
        searchInput.value = ""
    } else {
        let searchCity = searchInput.value
        getWeatherData(searchCity);
        searchButton.innerHTML = `<div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>`
    }
}

document.onload = getWeatherData("Mumbai")
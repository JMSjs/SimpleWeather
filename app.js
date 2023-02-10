const apiEndPoint = config.API_END_POINT;
const apiKEY = config.SECRET_API_KEY;

let latitude = 0.0;
let longitude = 0.0;
let cityName = "";
let state = "";
let country = "";

const searchForm = document.querySelector('form');
const searchTerm = document.querySelector('input');
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const locateCity = async () => {
        try {
            const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm.value}&limit=1&appid=${apiKEY}`);
            const data = await res.json();
            
            latitude = data[0].lat;
            longitude = data[0].lon;
            cityName = data[0].name;
            state = data[0].state;
            country = data[0].country;
            console.log(latitude, longitude, state, country);
            loadLocalWeather();
        } catch (err) {
            console.log ("Error at locating search term!!", err);
        }
    } 

    locateCity();
});

const displayCity = document.querySelector('.city');
const displayTemp = document.querySelector('.temperature');
const displayIcon = document.querySelector('.icon');
const displayDesc = document.querySelector('.description');





const loadLocalWeather = async () => {
    try {
        const res = await fetch(apiEndPoint + "lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKEY);
        const data = await res.json();
        let tempFahrenheit = Math.round((data.main.temp - 273.15) * 9/5 + 32);
        const weatherSection = document.querySelector('.weatherSection');
        const iconImg = document.createElement('img');
        iconImg.src = `https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png`;
        weatherSection.appendChild(iconImg);
        console.log(`The current weather in ${data.name}, ${data.sys.country} is ${data.weather[0].main}, and feels like ${tempFahrenheit}\u00B0 F.`);
    } catch (err) {
        console.log ("Error fetching weather data!", err)
    }
};




// loadLocalWeather();

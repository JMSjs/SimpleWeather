const apiEndPoint = config.API_END_POINT;
const apiKEY = config.SECRET_API_KEY;

let latitude = 47.608013
let longitude = -122.335167

const loadLocalWeather = async () => {
    try {
        const res = await fetch(apiEndPoint + "lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKEY);
        const data = await res.json();
        console.log(data); 
        let tempFahrenheit = Math.round((data.main.temp - 273.15) * 9/5 + 32);
        console.log(`The current weather in ${data.name}, ${data.sys.country} is ${data.weather[0].description}, and feels like ${tempFahrenheit}\u00B0 F.`);

    } catch (err) {
        console.log ("Error!!", err)
    }
};

loadLocalWeather();

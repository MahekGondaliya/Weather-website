 const apikey = "4b168ef28865e08cde6285325ae9c82f";
 const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";



const form = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');


export async function checkweather(city) {

    const response = await fetch(apiurl + city + `&appid=${apikey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        throw new Error('1');

    } else {
        
         var data = await response.json();

        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = data.main.temp + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
      
        const weathericon = document.querySelector('.box .weather-icon');
        const video = document.querySelector('#bg-video');
        
        
        console.log(data.weather[0].main);
        if (data.weather[0].main == "Clouds") {
            weathericon.src = "images/clouds.png";
            video.src="video/cloud.mp4";
        }

        if (data.weather[0].main == "Rain") {
            weathericon.src = "images/rain.png";
            video.src="video/rain.mp4";
        }

        if (data.weather[0].main == "Clear") {
            weathericon.src = "images/clear.png";
            video.src="video/clear.mp4";
        }

        if (data.weather[0].main == "Drizzle") {
            weathericon.src = "images/drizzle.png";
            video.src="video/storm.mp4";
        }

        if (data.weather[0].main == "Mist") {
            weathericon.src = "images/mist.png";
            video.src="video/snow.mp4";
        }
        
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

form.addEventListener('submit', function (event) {

    event.preventDefault();
    checkweather(searchInput.value);

});



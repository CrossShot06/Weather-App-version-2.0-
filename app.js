const apiKey = "531bd0e138e685eb07e43131365588a9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const searchBox = document.querySelector(".search");
const searchBtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(city) {

    try {
        const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found. Please try again.");
        }
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp-text").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity-value").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind-value").innerHTML = data.wind.speed + " km/h";

        if(data.sys && data.sys.sunrise && data.sys.sunset){
            const sunriseDate=new Date(data.sys.sunrise * 1000);
            const sunriseHours=sunriseDate.getHours();
            const sunriseMinutes=sunriseDate.getMinutes();
            const sunriseTime=`${String(sunriseHours).padStart(2,'0')}:${String(sunriseMinutes).padStart(2,'0')}`;

            const sunsetDate=new Date(data.sys.sunset * 1000);
            const sunsetHours=sunsetDate.getHours();
            const sunsetMinutes=sunsetDate.getMinutes();
            const sunsetTime=`${String(sunsetHours).padStart(2,'0')}:${String(sunsetMinutes).padStart(2,'0')}`;

            document.querySelector(".sunrise-time").innerHTML=sunriseTime;
            document.querySelector(".sunset-time").innerHTML=sunsetTime;
        }
        else{
            document.querySelector(".3").style.display="none";
            document.querySelector(".4").style.display="none";
        }

        const temp_max=Math.round(data.main.temp_max);
        const temp_min=Math.round(data.main.temp_min);

        document.querySelector(".max-min-value").innerHTML=temp_max+"°C/"+temp_min+"°C";
        document.querySelector(".feels-like-value").innerHTML=Math.round(data.main.feels_like) + "°C";


        const weatherCondition = data.weather[0].main.toLowerCase();
        weatherIcon.src = `images/${weatherCondition}.png`;

        document.body.style.backgroundImage=`url(./images/${weatherCondition}-bg.jpg)`
        document.querySelector(".weather-type").innerHTML=`${weatherCondition}`;

        const timezone=data.timezone;
        const unixTime=data.dt+timezone;
        const dateObj=new Date(unixTime*1000);
        const year=String(dateObj.getFullYear());
        const month=String(dateObj.getMonth()+1).padStart(2,'0');
        const date=String(dateObj.getDate()).padStart(2,'0');
        const hours=String(dateObj.getUTCHours()).padStart(2,'0');
        const minutes=String(dateObj.getUTCMinutes()).padStart(2,'0');

        const dayNum=dateObj.getDay();
        const daysofWeek=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const day=daysofWeek[dayNum];

        document.querySelector(".date-time").innerHTML=`${hours}:${minutes} - ${day} ${date}.${month}.${year}`;
        

        console.log(data);

        searchBox.value = "";
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert(error.message); // Show an error message to the user
    }

}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);

    } else {
        alert("Please enter a city name.");
    }
});
let weather = {
    apiKey : "73b1ea996ffa6cc2c6e1fa3445aad9a5",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid="+ this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
   
    },
    displayWeather: function(data){
        const { name } = data;
        const { country } = data.sys;
        const { icon,description } = data.weather[0];
        const { temp,humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed); 
        document.querySelector(".city").innerText = name +" | " + country;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".temp").innerText = Math.abs(parseInt(temp)) + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + " %";
        document.querySelector(".wind").innerText = "Wind: " + speed + "km/h ";   
        document.querySelector(".weather").classList.remove("loading");
        document.querySelector(".side-left").style.background = "url('https://source.unsplash.com/1800x1600/?"+name+"') no-repeat";
        document.querySelector(".side-left").style.backgroundSize = "100% 100%";
    },
    init: function(){
        if(localStorage.getItem("city") === null){
            localStorage.setItem("city","Lima");
        }
        this.fetchWeather(localStorage.getItem("city"));
    },
    search: function(){
        localStorage.setItem("city",document.querySelector(".search-bar").value);
        this.fetchWeather(localStorage.getItem("city"));
    }
};

weather.init();
document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});


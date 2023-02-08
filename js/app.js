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
        document.querySelector(".side-left").style.background = "url('https://source.unsplash.com/900x1600/?"+name+"') no-repeat center fixed";
        document.querySelector(".side-left").style.backgroundSize = "cover";
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    }
})
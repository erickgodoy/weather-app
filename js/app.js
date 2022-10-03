let weather = {
    apiKey : "73b1ea996ffa6cc2c6e1fa3445aad9a5",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid="+ this.apiKey)
        .then((response) => response.json())
        .then((data) => console.log(data));
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon,description } = data.weather;
        const { temp,humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed); 
        document.querySelector(".city").innerText = "Weather in" + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = 
        temp + "°C";
        document.querySelector(".humidity").innerText = humidity + "%";
        document.querySelector(".Wind speed").innerText = 
        temp + "km/h ";   
        document.querySelector(".weather").classList.remove("loading");
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
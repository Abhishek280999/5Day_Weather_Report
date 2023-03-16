function Search(){
    let input = document.querySelector('input').value
    console.log(input);
    weather(input)
  }
function weather(city){
    let key = "7f0d90825061c4a9c5c6f766a4dd4df0";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`)
    .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        weekWeather(data)
      })
      .catch((error) => {
        console.log(error);
      });
}
 function weekWeather(data) {
    let key = "7f0d90825061c4a9c5c6f766a4dd4df0";
    var lon = data.coord.lon; 
    var lat = data.coord.lat;
    console.log(lon, lat);
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${key}`)
    .then((res) => {
        return res.json();
      })
      .then((item) => {
        console.log(item);
        display(item)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function display(data1) {
    var fineldata = data1.daily;
    console.log(fineldata);

    fineldata.forEach(function (item, index)  {
       var div = document.createElement("div");
       var arr = ["Today", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
       var h4 = document.createElement("h4");
       h4.textContent = arr[index];

       var logo = document.createElement("div");
       var logoarr = [
            '<i class="fas fa-cloud-sun"></i>',
            '<i class="fas fa-cloud-rain"></i>',
            '<i class="fas fa-cloud-showers-heavy"></i>',
            '<i class="fas fa-cloud-sun-rain"></i>',
            '<i class="fas fa-cloud-showers-heavy"></i>',
            '<i class="fas fa-cloud-sun-rain"></i>',
            '<i class="fas fa-cloud-rain"></i>',
            '<i class="fas fa-cloud-sun-rain"></i>',
       ]
      logo.innerHTML = logoarr[index];
      var temp1 = document.createElement("h4");
      temp1.textContent = Math.round(item.temp.day) + "°C";
      var temp2 = document.createElement("p");
      temp2.textContent = Math.round(item.temp.min) + "°C";
      div.append(h4, logo, temp1, temp2);

       document.querySelector('.cards').append(div) 
    });
  }
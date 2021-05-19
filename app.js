window.addEventListener('load', () => {
    let long;
    let lat;
    const countryName = document.querySelector('#countryName');
    const cityName = document.querySelector('#cityName');
    const tempDesc = document.querySelector('#description');
    const temperature = document.querySelector('#temp');
    const iconDiv = document.querySelector('.icon');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let long = position.coords.longitude;
            let lat = position.coords.latitude;
            console.log(` longitude =  ${long} and latitude = ${lat}`);
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=0be1e7e3cfbb30443197baae89a01de7`;
            fetch(api)
                .then(Response => {
                    return Response.json();
                })
                .then(data => {
                    const { name } = data;
                    const { id, icon, description } = data.weather[0];
                    const { feels_like } = data.main;
                    const { country } = data.sys;
                    if (country === 'NP') {
                        countryName.textContent = 'Nepal,';
                    } else {
                        countryName.textContent = country;
                    }
                    // Displaying into the UI
                    cityName.textContent = name;
                    const iconmain = document.createElement('img');
                    iconmain.src = `./icons/${icon}.png`;
                    iconmain.setAttribute('draggable', 'false');
                    iconmain.setAttribute('alt', "weather icon can't be fetched ");
                    iconDiv.appendChild(iconmain);
                    tempDesc.textContent = description;
                    temperature.textContent = (feels_like - 273).toFixed(1);
                    console.log(data);
                });
        });
    }
});
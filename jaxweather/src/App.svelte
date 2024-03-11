<script>
    import {onMount} from "svelte";

    let blur = true;

    let unit = "imperial";

    let lat, lon;
    let weatherData;

    let sunrise_hour, sunrise_minute;
    let sunset_hour, sunset_minute;

    onMount(async () => {
        const apiKey = "9e611ff8686d07f0077515ec151bb366";

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((event) => {
                lat = event.coords.latitude;
                lon = event.coords.longitude;

                let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
                fetch(apiUrl)
                    .then(response => {
                        if (!response.ok) {
                            console.error("response not ok");
                        } else {
                            return response.json();
                        }
                    })
                    .then(data => {
                        console.log(data);
                        weatherData = data;

                        let sunrise_date = new Date(data.sys.sunrise * 1000);
                        let sunset_date = new Date(data.sys.sunset * 1000);

                        sunrise_hour = ('0' + sunrise_date.getHours()).slice(-2);
                        sunrise_minute =  ('0' + sunrise_date.getMinutes()).slice(-2);

                        sunset_hour = ('0' + sunset_date.getHours()).slice(-2);
                        sunset_minute = ('0' + sunset_date.getMinutes()).slice(-2);
                    });
            });
        }
    });

    let theme = "dark-nature";

    const themeStyles = ["--menu", "--panel", "--def-color", "--highlight", "--border", "--semi-highlight"];
    const themes = {
        "dark-nature": [ "rgba(0, 0, 0, 0.5)", "rgba(35, 35, 35, 0.5)", "#a2a2a2", "white", "#2b2b2b", "#eaeaea" ],
        "modern-light": [ "rgba(255, 255, 255, 0.55)", "rgba(210, 210, 210, 0.5)", "#101010", "black", "#cacaca", "#101010" ]
    }
    
    function setTheme(theme) { for (let i=0; i<themeStyles.length; i++) { document.querySelector(":root").style.setProperty(themeStyles[i], themes[theme][i]); } }
</script>




<div class="panel" id="side-menu">
    <div>
        <h2>Location <i class="fa-regular fa-location-pin"></i></h2>
        <p>Geolocation (Automatic)</p>
        <p>Selection (Manual)</p>
    </div>
    <div>
        <h2>Units <i class="fa-regular fa-ruler"></i></h2>
        <p>Imperial (F)</p>
        <p>Metric (C)</p>
    </div>
    <div>
        <h2>Theme <i class="fa-regular fa-paint-roller"></i></h2>
        <p on:click={() => {setTheme("dark-nature")}}>Dark Nature</p>
        <p on:click={() => {setTheme("modern-light")}}>Modern Light</p>
        <p on:click={() => {setTheme("cyberpunk")}}>Cyberpunk</p>
    </div>
    <div>
        <h2>Background</h2>
        <p on:click={() => {document.body.style.backgroundImage="url('https://jaxsonoconnor09.github.io/image-repo/blossom.png')"}}>Nature</p>
        <p on:click={() => {document.body.style.backgroundImage="url('https://cdn.pixabay.com/photo/2017/08/07/10/32/black-and-white-2602403_1280.jpg')"}}>Mountains</p>
        <label for="background-upload">Upload Image <i class="fa-regular fa-upload"></i></label>
        <input id="background-upload" accept="image/png, image/jpg" type="file" on:change={(event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.body.style.backgroundImage = `url(${e.target.result})`;
                };
                reader.readAsDataURL(file);
            }
        }}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <p on:click={() => {
            blur = !blur;
            document.querySelectorAll(".panel").forEach(elem => {
                elem.style.backdropFilter = `blur(${blur ? 40 : 0}px) brightness(${theme != "modern-light" ? 85 : 100}%)`;
            });
        }}>Blur: {blur ? "On" : "Off"}</p>
    </div>

    <div id="jaxweather">
        <img src="greenLogo.png" alt="">
        <h2>JaxWeather</h2>
    </div>
</div>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="panel" id="info">
    <div id="weather-panel">
        {#if weatherData}
            <h2>Weather in <span>{weatherData.name}, {weatherData.sys.country}</span></h2>
            <div id="temp" style="height: 250px;">
                {Math.round(weatherData.main.temp)}° {unit == "imperial" ? "F" : "C"}
            </div>
            <span class="weather-detail" id="desc">
                <img src="http://openweathermap.org/img/w/{weatherData.weather[0].icon}.png" alt="weather icon" />
                <p id="desc-text"><u>{weatherData.weather[0].description}</u></p>
            </span>
            <span class="weather-detail">
                <p>Humidity: <span>{weatherData.main.humidity}%</span></p>
                <p>Pressure: <span>{weatherData.main.pressure/1000} atmos.</span></p>
            </span>
            <span class="weather-detail">
                <p>High: <span>{Math.round(weatherData.main.temp_max)}° {unit == "imperial" ? "F" : "C"}</span></p>
                <p>Low: <span>{Math.round(weatherData.main.temp_min)}° {unit == "imperial" ? "F" : "C"}</span></p>
            </span>
            <span class="weather-detail">
                <p>Sunrise: <span>{sunrise_hour}:{sunrise_minute}</span></p>
                <p>Sunset: <span>{sunset_hour}:{sunset_minute}</span></p>
            </span>
        {:else}
            <h2 style="text-align: center; color: rgb(255, 50, 50); font-weight: 400; line-height: 496px; font-size: 20px;">Something went wrong.</h2>
        {/if}
    </div>
</div>
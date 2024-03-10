import './App.css';

let lat;
let lon;
let apiUrl;
let data = {};

function App() {
   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((e) => {
      lat = e.coords.latitude;
      lon = e.coords.longitude;
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=9e611ff8686d07f0077515ec151bb366`;
    
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            console.error("Response was not ok.");
          } else {
            return response.json();
          }
        })
        .then(weatherData => {
          data = weatherData;
          console.log(weatherData);
        });
    });
  }
  console.log("LAT: ", lat, " LON: ", lon);
  
  return (
    <div className="App">
      <div className="panel" id="side-menu">
        <div>
          <h2>Location</h2>
          <p>Geolocation (Automatic)</p>
          <p>Selection (Manual)</p>
        </div>
        <div>
          <h2>Units</h2>
          <p>Imperial (F)</p>
          <p>Metric (C)</p>
        </div>
        <div>
          <h2>Theme</h2>
          <p>Dark Nature</p>
          <p>Modern Light</p>
          <p>Cyberpunk</p>
        </div>
        <div>
          <h2>Background</h2>
          {/* <label for="background-upload">Upload Image</label>
          <input id="background-upload" accept="image/png, image/jpg" type="file" onChange={(event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.body.style.backgroundImage = `url(${e.target.result})`;
                };
                reader.readAsDataURL(file);
            }
          }} /> */}
          {/* <p onClick={() => {
            localStorage.setItem("blur", !blur);
            blur = localStorage.getItem("blur");
          }}>Blur: {blur ? "ON" : "OFF"}</p> */}
        </div>
      </div>
      <div className="panel" id="info">
        <p>Temp: {data.main.temp}</p>
      </div>
    </div>
  );
}

export default App;

import { useEffect, useRef, useState } from "react";
import "./App.css";

const BASE_URL = `https://api.weatherapi.com/v1/current.json?key=7a81928411d1410daa933134251301&q=`;

function App() {
  const [weather, setWeather] = useState(() => {
    const savedWeather = localStorage.getItem("weather");
    return savedWeather ? JSON.parse(savedWeather) : {};
  });
  const [country, setCountry] = useState(() => {
    const savedCountry = localStorage.getItem("country");
    return savedCountry ? JSON.parse(savedCountry) : {};
  });

  const [countrySelected, setCountrySelected] = useState(() => {
    return localStorage.getItem("countrySelected") || "";
  });

  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem("time");
    return savedTime ? JSON.parse(savedTime) : {};
  });

  const inputRef = useRef();

  const handleButtonSend = () => {
    const inputValue = inputRef.current.value;
    setCountrySelected(inputValue);
    localStorage.setItem("countrySelected", inputValue);
  };

  useEffect(() => {
    if (countrySelected) {
      fetch(`${BASE_URL}${countrySelected}`, { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          const { temp_c, humidity, wind_kph, precip_mm } = data.current;
          const { name, country, localtime } = data.location;

          const date = new Date(localtime).toLocaleTimeString("es-ES");
          const dateName = new Date(localtime).toLocaleDateString("es-ES");

          const newCountry = {
            country: country,
            name: name,
          };

          const newTime = {
            time: date,
            date: dateName,
          };

          const newWeather = {
            grades: temp_c,
            humidity: humidity,
            windkph: wind_kph,
            precipmm: precip_mm,
          };

          // Actualiza los estados
          setCountry(newCountry);
          setTime(newTime);
          setWeather(newWeather);

          // Guarda en localStorage
          localStorage.setItem("country", JSON.stringify(newCountry));
          localStorage.setItem("time", JSON.stringify(newTime));
          localStorage.setItem("weather", JSON.stringify(newWeather));
        });
    }
  }, [countrySelected]);

  console.log("Me renderizo como componente");

  return (
    <>
      <h1>App del Clima 🌤</h1>
      <div className="input-container">
        <input
          ref={inputRef}
          placeholder="Ingresa un país, provincia o ciudad para consultar el clima..."
          id="input-element"
        />
        <button onClick={handleButtonSend}>Ver Clima</button>
      </div>
      {country.country ? (
        <div className="weather-app-container">
          <div className="weather">
            <div className="weather-info">
              {weather.grades > 25 ? (
                <img className="iconWeather" src={"/images/sun.png"} />
              ) : null}
              {weather.grades < 20 ? (
                <img className="iconWeather" src={"images/snow.png"} />
              ) : null}
              <p className="grades">{weather.grades}</p>
              <p className="text-grades">
                <span className="degree-symbol">º</span>C
              </p>
            </div>
            <div className="weather-info-extra">
              <p className="weather-text">Humedad: {weather.humidity}%</p>
              <p className="weather-text">Viento a: {weather.windkph} km/h</p>
              <p className="weather-text">
                Precipitaciones: {weather.precipmm} %
              </p>
            </div>
          </div>

          <div className="weather-app-location">
            <p className="weather-text">
              🗺 {`${country.name}, ${country.country} `}
            </p>
            <p className="weather-text">
              {time.date} {time.time}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default App;

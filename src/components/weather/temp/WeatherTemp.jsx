import "./weatherTemp.scss";
import React from "react";

function WeatherTemp({ data }) {
  return (
    <div className="card">
      <h3>{data.city}</h3>
      <div className="infos">
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`}
        />
        <div className="descriptions">
          <p className="temp">{Math.round(data.main.temp)} °C</p>
          <p className="desc">{data.weather[0].description}</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherTemp;

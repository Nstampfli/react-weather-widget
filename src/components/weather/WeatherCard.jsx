import "./weatherCard.scss";
import React from "react";

function WeatherCard({ title, data, metric }) {
  return (
    <div className="weather-card">
      <h3>{title}</h3>
      <div className="infos">
        <p>
          <span className="data">
            {data}
          </span>{" "}
          {metric}
        </p>
      </div>
    </div>
  );
}

export default WeatherCard;

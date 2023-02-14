import "./reset.css";
import "./App.scss";
import React, { useState } from "react";
import SearchAdress from "./components/inputs/SearchAdress";
import WeatherTemp from "./components/weather/temp/WeatherTemp";
import WeatherCard from "./components/weather/WeatherCard";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../src/hooks/constant";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [activeFilters, setActiveFilters] = useState(["temp"]);
  const filters = ["temp", "wind", "pressure", "humidity"];

  function changeFilter(filter) {
    let a = activeFilters;

    if (activeFilters.includes(filter)) {
      a.splice(activeFilters.indexOf(filter), 1);
      console.log(activeFilters);
    } else {
      a.push(filter);
    }
    setActiveFilters([...a]);
  }

  function handleOnSearchChange(searchData) {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
      })
      .catch(console.log);
  }
  return (
    <div className="app">
      <Header />
      <div className="container">
        <SearchAdress onSearchChange={handleOnSearchChange} />
        {currentWeather && (
          <div className="content">
            <div className="filters">
              {filters.map((filter) => (
                <div
                  key={filter}
                  className={`filter ${
                    activeFilters.includes(filter) ? "active" : ""
                  }`}
                  onClick={() => changeFilter(filter)}
                >
                  {filter}
                </div>
              ))}
            </div>

            <div className="widget-container">
              {activeFilters.includes("temp") && (
                <WeatherTemp data={currentWeather} />
              )}

              {activeFilters.includes("wind") && (
                <WeatherCard
                  title={"Speed Wind : "}
                  data={Math.round(currentWeather.wind.speed * 36) / 10}
                  metric={"km/h"}
                />
              )}

              {activeFilters.includes("pressure") && (
                <WeatherCard
                  title={"Pressure : "}
                  data={currentWeather.main.pressure}
                  metric={"hPa"}
                />
              )}

              {activeFilters.includes("humidity") && (
                <WeatherCard
                  title={"Humidity : "}
                  data={currentWeather.main.humidity}
                  metric={"%"}
                />
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;

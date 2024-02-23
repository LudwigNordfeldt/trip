import "./App.css";

import TripList from "./components/TripList";
import Search from "./components/Search";
import ForecastWeek from "./components/ForecastWeek";
import { ForecastToday } from "./components/ForecastWeek";
import { useEffect, useState, useCallback } from "react";

import WeatherImage from "./images/Weather/Background.jpg";
import CloudsImage from "./images/Weather/Clouds.jpg";

function App() {
  const [forecast, setForecast] = useState(false);
  const [today, setToday] = useState(false);
  const [search, setSearch] = useState("");

  const currentDate = new Date();
  const date = currentDate.toISOString().split("T")[0];

  let text = "";

  const count = (date) => {
    let endDate = new Date(date);

    let countdownDate = endDate.getTime();
    let now = new Date().getTime();

    let distance = countdownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    text = [
      days.toString().concat(" Days"),
      hours.toString().concat(" Hours"),
      minutes.toString().concat(" Minutes"),
      seconds.toString().concat(" Seconds"),
    ];

    document.getElementById("days").innerHTML = text[0];
    document.getElementById("hours").innerHTML = text[1];
    document.getElementById("minutes").innerHTML = text[2];
    document.getElementById("seconds").innerHTML = text[3];
  };

  const getWeather = useCallback(async (city, from, to) => {
    const data = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${from}/${to}?key=MZ8UTRHBK25HRPR3LGYTNUHR2`
    );

    const json = await data.json();

    const res = json["days"].map((day) => ({
      temp: day["temp"],
      conditions: day["conditions"],
      date: day["datetime"],
      icon: day["icon"],
    }));

    setForecast(res);
  }, []);

  const getToday = useCallback(
    async (city) => {
      const data = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${date}?key=MZ8UTRHBK25HRPR3LGYTNUHR2`
      );

      const json = await data.json();

      const res = json["days"].map((day) => ({
        temp: day["temp"],
        conditions: day["conditions"],
        date: day["datetime"],
        icon: day["icon"],
      }));

      res["city"] = json["address"];

      setToday(res);
    },
    [date]
  );

  useEffect(() => {
    window.first = setInterval(count, 1000, "Feb 25, 2024 00:00:00");

    getWeather("Berlin", "2024-02-25", "2024-02-28");
    getToday("Berlin");
  }, [getToday, getWeather]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        style={{
          display: "flex",
          gap: "25pt",
          paddingLeft: "40pt",
          flexDirection: "column",
          backgroundImage: `url(${CloudsImage})`,
          backgroundSize: "68vw 100vh",
        }}
      >
        <h2>Weather Forecast</h2>

        <Search search={search} setSearch={setSearch}>
          {" "}
        </Search>

        <TripList
          getWeather={getWeather}
          getToday={getToday}
          getCount={count}
          filter={search}
        ></TripList>

        <h4>Forecast for the trip</h4>
        {forecast ? <ForecastWeek days={forecast}></ForecastWeek> : <div></div>}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: "20vh",
          backgroundImage: `url(${WeatherImage})`,
          width: "38vw",
          height: "80vh",
        }}
      >
        {today ? (
          <div style={{ color: "white", fontSize: "18pt", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <ForecastToday days={today}></ForecastToday>
            <p style={{ fontFamily: "sans-serif" }}>
              {today.city}
            </p>
            <div style={{ display: "flex" }}>
              <p style={{ width: "6vw" }} id="days"></p>
              <p style={{ width: "7vw" }} id="hours"></p>
              <p style={{ width: "8vw" }} id="minutes"></p>
              <p style={{ width: "8vw" }} id="seconds"></p>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default App;

import CloudyNight from "../images/Weather/cloudnight.png";
import Cloudy from "../images/Weather/clouds.png";
import CloudyDay from "../images/Weather/cloudy.png";
import Fog from "../images/Weather/fog.png";
import ClearNight from "../images/Weather/moon.png";
import Rain from "../images/Weather/raining.png";
import Snow from "../images/Weather/snow.png";
import ClearDay from "../images/Weather/sun.png";
import Wind from "../images/Weather/wind.png";

const icons = new Map([
  ["snow", Snow],
  ["rain", Rain],
  ["fog", Fog],
  ["wind", Wind],
  ["cloudy", Cloudy],
  ["partly-cloudy-day", CloudyDay],
  ["partly-cloudy-night", CloudyNight],
  ["clear-day", ClearDay],
  ["clear-night", ClearNight],
]);

const weekday = new Map([
  [0, "Sunday"],
  [1, "Monday"],
  [2, "Tuesday"],
  [3, "Wednesday"],
  [4, "Thursday"],
  [5, "Friday"],
  [6, "Saturday"],
]);

const ForecastWeek = (props) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2vw",
          flexWrap: "wrap",
          overflow: "scroll",
          height: "13vw",
          width: "60vw",
          overflowX: "hidden",
          
        }}
      >
        {props.days.map((day) => (
          <div style={{alignItems: "center", textAlign: "center"}}>
            <p>
              <b>{weekday.get(new Date(day.date).getDay())}, {new Date(day.date).toDateString().slice(4,10) }</b>
            </p>

            <img
              src={icons.get(day.icon)}
              alt=""
              style={{ width: "3vw", height: "4vh" }}
            ></img>
            
            <p><b>{Math.round((day.temp-32)*5/9)}°</b></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ForecastToday = (props) => {
  return (
    <div>
      {props.days.map((day) => (
        <div style={{ lineHeight: "8vh", verticalAlign: "middle"}}>
          <p style={{ marginLeft: "3vw" }}>{weekday.get(new Date(day.date).getDay())}</p>
          
          <div style={{display: "flex", textAlign: "center"}}>
          <img
            src={icons.get(day.icon)}
            alt=""
            style={{ width: "5vw", height: "8vh", margin: "5pt" }}
          ></img>
          <p style={{fontSize: "24pt"}}>{Math.round((day.temp-32)*5/9)}°C </p></div>

          
        </div>
      ))}
    </div>
  );
};

export default ForecastWeek;

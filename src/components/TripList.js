/* eslint-disable no-restricted-globals */

import TripCard from "./TripCard";

import { IoIosAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

import { useState, useRef, useContext } from "react";
import CounterContext from "../ContextProvider";

import Berlin from "../images/Berlin.jpg";
import Budapest from "../images/Budapest.jpeg";
import Milan from "../images/Milan.jpg";
import Paris from "../images/Paris.jpg";
import Prague from "../images/Prague.jpg";
import Rome from "../images/Rome.jpg";
import Stuttgart from "../images/Stuttgart.jpg";
import Tokyo from "../images/Tokyo.jpg";

const pics = new Map([
  ["Berlin", Berlin],
  ["Budapest", Budapest],
  ["Milan", Milan],
  ["Paris", Paris],
  ["Prague", Prague],
  ["Rome", Rome],
  ["Stuttgart", Stuttgart],
  ["Tokyo", Tokyo],
]);

const TripList = (props) => {
  const [trips] = useContext(CounterContext);

  const cache = window.localStorage.getItem("trips");
  const cachedTrips = JSON.parse(cache);

  let allTrips = [];
  if (cachedTrips) {
    allTrips = trips.concat(cachedTrips);
  } else {
    allTrips = trips;
  }

  const filteredTrips = allTrips.filter((el) =>
    el.name.toLowerCase().includes(props.filter.toLowerCase())
  );

  const selectTrip = (event) => {
    const city = event.currentTarget.value.split(",")[0];
    const from = event.currentTarget.value.split(",")[1];
    const to = event.currentTarget.value.split(",")[2];
    props.getWeather(city, from, to);
    props.getToday(city);

    clearInterval(window.first);

    clearInterval(window.second);

    window.second = setInterval(props.getCount, 1000, from);

    const children = document.getElementById("triplist").children;

    for (let i = 0; i < children.length; i++) {
      let card = children[i];
      card.style.border = "none";
    }

    event.currentTarget.style.border = "1px solid blue";
  };

  return (
    <div
      id="triplist"
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "2vw",
        flexWrap: "wrap",
        overflow: "scroll",
        height: "20vw",
        width: "60vw",
        overflowX: "hidden",
      }}
    >
      {filteredTrips.map((trip) => (
        <button
          value={[trip.name, trip.from, trip.to]}
          onClick={selectTrip}
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <TripCard trip={trip}></TripCard>
        </button>
      ))}

      <AddTrip trips={props.trips} setTrips={props.setTrips}></AddTrip>
    </div>
  );
};

const AddTrip = (props) => {
  const [isCityListOpen, setCityListOpen] = useState(false);
  const [city, setCity] = useState("Please select city");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [error, setError] = useState(false)

  const [trips, dispatch] = useContext(CounterContext);

  const toggle = () => {
    event.preventDefault();
    setCityListOpen(!isCityListOpen);
  };

  const select = (event) => {
    event.preventDefault();
    setCityListOpen(!isCityListOpen);
    setCity(event.target.value);
  };

  const daysDifference = (date1, date2) => {
    let differenceInTime = date2.getTime() - date1.getTime();
    let differenceinDays = Math.round(differenceInTime / (1000 * 3600 * 24));

    return differenceinDays
  }

  const add = () => {
    const newTrip = [
      {
        name: city,
        pic: pics.get(city),
        from: from,
        to: to,
      },
    ];

    if (!city || !from || !to) {
      event.preventDefault();
      
      setError("Incomplete information!");

      setTimeout(() => {
        setError(false)
      }, 3000)
      return;
    }

    if (
      daysDifference(new Date(from), new Date(to)) <= 0 ||
      daysDifference(new Date(), new Date(to)) > 15 ||
      daysDifference(new Date(), new Date(from)) > 15 ||
      daysDifference(new Date(to), new Date()) > 0 ||
      daysDifference(new Date(from), new Date()) > 0
    ) {
      event.preventDefault();
      
      setError("Incorrect date!");

      setTimeout(() => {
        setError(false)
      }, 3000)
      return;
    }

    const cache = window.localStorage.getItem("trips");
    const cachedTrips = JSON.parse(cache);

    if (cachedTrips) {
      const newTrips = cachedTrips.concat(newTrip);
      window.localStorage.setItem("trips", JSON.stringify(newTrips));
    } else {
      window.localStorage.setItem("trips", JSON.stringify(newTrip));
    }

    dialog.current.close();
  };

  const openBtn = useRef();
  const closeBtn = useRef();
  const dialog = useRef();

  const open = () => {
    dialog.current.showModal();
  };

  const close = () => {
    dialog.current.close();
  };

  return (
    <div>
      <button
        ref={openBtn}
        onClick={open}
        style={{
          width: "16vw",
          height: "25vh",
          backgroundColor: "rgba(255,255,255,0.3)",
          border: "none",
        }}
      >
        <IoIosAdd></IoIosAdd>
        <p>
          <b>Add trip</b>
        </p>
      </button>

      <dialog ref={dialog} style={{ border: "none" }}>
        {error ? (<div style={{backgroundColor: "#EF9A9A", border: "none", color: "white", textAlign: "center"}}>{error}</div>):(<div></div>)}

        <div style={{display: "flex", gap: "8vw"}}>
          <h5>Create trip</h5>
          <button
            style={{
              backgroundColor: "white",
              border: "none",
              
            }}
            onClick={close}
          >
            <IoMdClose></IoMdClose>
          </button>
        </div>

        <form>
          <span style={{ color: "red" }}>*</span>City
          <p>
            <div>
              <button onClick={toggle} style={{ width: "14vw", backgroundColor: 'white', border: '1px solid lightgray', margin: '5pt' }}>{city}</button>
              {isCityListOpen ? (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <button onClick={select} value={"Berlin"} style={{ width: "14vw", backgroundColor: 'white', border: '1px solid lightgray', margin: '5pt' }}>
                      Berlin{" "}
                      <img
                        src={Berlin}
                        alt=""
                        style={{ width: 60, height: 35 }}
                      ></img>
                    </button>

                    <button onClick={select} value="Budapest" style={{ width: "14vw", backgroundColor: 'white', border: '1px solid lightgray', margin: '5pt' }}>
                      Budapest{" "}
                      <img
                        src={Budapest}
                        alt=""
                        style={{ width: 60, height: 35 }}
                      ></img>
                    </button>

                    <button onClick={select} value="Milan" style={{ width: "14vw", backgroundColor: 'white', border: '1px solid lightgray', margin: '5pt' }}>
                      Milan{" "}
                      <img
                        src={Milan}
                        alt=""
                        style={{ width: 60, height: 35 }}
                      ></img>
                    </button>

                    <button onClick={select} value="Paris" style={{ width: "14vw", backgroundColor: 'white', border: '1px solid lightgray', margin: '5pt' }}>
                      Paris{" "}
                      <img
                        src={Paris}
                        alt=""
                        style={{ width: 60, height: 35 }}
                      ></img>
                    </button>

                    <button onClick={select} value="Prague" style={{ width: "14vw", backgroundColor: 'white', border: '1px solid lightgray', margin: '5pt' }}>
                      Prague{" "}
                      <img
                        src={Prague}
                        alt=""
                        style={{ width: 60, height: 35 }}
                      ></img>
                    </button>

                    <button onClick={select} value="Rome" style={{ width: "14vw", backgroundColor: 'white', border: '1px solid lightgray', margin: '5pt' }}>
                      Rome{" "}
                      <img
                        src={Rome}
                        alt=""
                        style={{ width: 60, height: 35 }}
                      ></img>
                    </button>

                    <button onClick={select} value="Stuttgart" style={{ width: "14vw", backgroundColor: 'white', border: '1px solid lightgray', margin: '5pt' }}>
                      Stuttgart{" "}
                      <img
                        src={Stuttgart}
                        alt=""
                        style={{ width: 60, height: 35 }}
                      ></img>
                    </button>

                    <button onClick={select} value="Tokyo" style={{ width: "14vw", backgroundColor: 'white', border: '1px solid lightgray', margin: '5pt' }}>
                      Tokyo{" "}
                      <img
                        src={Tokyo}
                        alt=""
                        style={{ width: 60, height: 35 }}
                      ></img>
                    </button>
              </div>
              ) : (
                <div></div>
              )}
            </div>
          </p>
          <span style={{ color: "red" }}>*</span>Start Date
          <p>
            <input
              type="text"
              placeholder="Select date"
              value={from}
              onInput={(event) => setFrom(event.target.value)}
              onFocus={(e) => (e.target.type = "date")}
              style={{ border: "1px solid lightgray", width: "14vw" }}
            ></input>
          </p>
          <span style={{ color: "red" }}>*</span>End Date
          <p>
            <input
              type="text"
              placeholder="Select date"
              value={to}
              onInput={(event) => setTo(event.target.value)}
              onFocus={(e) => (e.target.type = "date")}
              style={{ border: "1px solid lightgray", width: "14vw" }}
            ></input>
          </p>
          <button
            onClick={add}
            type="submit"
            style={{
              width: "4vw",
              height: "3vh",
              marginLeft: "5pt",
              backgroundColor: "#2596be",
              color: "white",
              border: "none",
              textAlign: "center",
              float: "right"
            }}
          >
            Save
          </button>

          <button
            ref={closeBtn}
            onClick={close}
            style={{
              width: "4vw",
              height: "3vh",
              backgroundColor: "white",
              border: "1px solid lightgray",
              alignContent: "center",
              float: "right"
            }}
          >
            Cancel
          </button>
          
        </form>
      </dialog>
    </div>
  );
};

export default TripList;

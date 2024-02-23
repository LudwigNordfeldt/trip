const TripCard = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={props.trip.pic}
        alt=""
        style={{ width: "16vw", height: "16vh" }}
      ></img>
      <p>
        <b>{props.trip.name}</b>
      </p>
      <p>
        <b>
          {props.trip.from} - {props.trip.to}
        </b>
      </p>
    </div>
  );
};

export default TripCard;

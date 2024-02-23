import { IoIosSearch } from "react-icons/io";

const Search = (props) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(255,255,255,0.3)",
        width: "fit-content",
        borderRadius: "15pt",
        display: "flex",
        alignItems: "center"
      }}
    >
      <IoIosSearch style={{paddingLeft: "5pt"}}></IoIosSearch>
      <input
        type="text"
        placeholder="Search your trip"
        style={{ border: "none", backgroundColor: "rgba(255,255,255,0.3)", padding: "10pt", borderRadius: "15pt" }}
        value={props.search}
        onInput={(event) => {
          event.preventDefault();
          props.setSearch(event.target.value);
        }}
      ></input>
    </div>
  );
};

export default Search;

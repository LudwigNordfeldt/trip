import { createContext, useReducer } from "react";
import berlin from "../src/images/Berlin.jpg";

const counterReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
            name: action.city,
            pic: action.pic,
            from: action.from,
            to: action.to,
        },
      ];
    default:
      return state;
  }
};

const initialTrips = [
  {
    name: "Berlin",
    pic: berlin,
    from: "2024-02-25",
    to: "2024-02-27",
  },
];

const CounterContext = createContext();

export const CounterContextProvider = (props) => {
  const [counter, counterDispatch] = useReducer(counterReducer, initialTrips);

  return (
    <CounterContext.Provider value={[counter, counterDispatch]}>
      {props.children}
    </CounterContext.Provider>
  );
};

export default CounterContext;

import { useReducer, useRef } from "react";

function reducer(state, action) {
  if (action.type === "incremented_age") {
    return {
      age: state.age + 1,
    };
  }
  if (action.type === "decremented_age") {
    return {
      age: state.age - 1,
    };
  }

  throw Error("Unknown action.");
}
// let count = 0;

// function handleClick() {
//   count++;
//   console.log(count);
// }

const countRef = useRef(0);
function handleClick() {
  countRef.current++;
  console.log(countRef.current);
}
export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });

  return (
    <>
      <button
        onClick={() => {
          dispatch({ type: "incremented_age" });
        }}
      >
        Increment age
      </button>
      <button
        onClick={() => {
          dispatch({ type: "decremented_age" });
        }}
      >
        " " decrement age
      </button>
      <p>Hello! You are {state.age}.</p>
      <button onClick={handleClick}>Click red</button>;
    </>
  );
}

import React from "react";
import { add, multiply, subtract, divide } from "../calculator";

function List() {
  return (
    <ul>
      <li>{add(1, 2)}</li>
      <li>{multiply(2, 3)}</li>
      <li>{subtract(7, 2)}</li>
      <li>{divide(5, 2)}</li>
    </ul>
  );
}

export default List;

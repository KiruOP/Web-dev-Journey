//Create a React app from scratch.
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.

import React from "react";
import ReactDOM from "react-dom";

const time = new Date().getHours();
let greating = "";
let customStyle = {
  color: "",
};
if (time < 12) {
  greating = "Good Morning";
  customStyle.color = "red";
} else if (time < 18) {
  greating = "Good Afternoon";
  customStyle.color = "green";
} else if (time < 24) {
  greating = "Good Night";
  customStyle.color = "blue";
  console.log(time);
}

ReactDOM.render(
  <div>
    <h1 className="heading" style={customStyle}>
      {greating}
    </h1>
  </div>,
  document.getElementById("root")
);

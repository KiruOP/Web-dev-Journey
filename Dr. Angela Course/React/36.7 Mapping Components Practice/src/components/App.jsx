import React from "react";
import Card from "./Card";
import emojipedia from "../emojipedia";

function App() {
  function createCard(item) {
    return (
      <Card
        key={item.id}
        emoji={item.emoji}
        name={item.name}
        description={item.meaning}
      />
    );
  }
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>
      <dl className="dictionary">{emojipedia.map(createCard)}</dl>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import ComicButton from "./components/ComicButton/ComicButton";
import Counter from "./components/Counter/Counter";

export default function App() {
  const [count, setCount] = useState<number>(0);
  const handleButtonClick = () => {
    setCount(count + 1);
  };
  return (
    <div className="App">
      <div className="buttonContainer">
        <ComicButton
          buttonName="BUTTON"
          hoverBtnName="HOVER"
          handleButtonClick={handleButtonClick}
        />
        <Counter count={count} />
      </div>
    </div>
  );
}

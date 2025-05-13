import React, { useState } from "react";
import Button from "./Button.jsx";

function Calculator() {
  const [display, setDisplay] = useState("");
  const keys = [
    "7",
    "8",
    "9",
    "+",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "*",
    ".",
    "0",
    "=",
    "/",
    "C",
  ];
  const operators = ["+", "-", "*", "/", "C", "="];

  const handleClick = (key) => {
    if (key === "=") {
      try {
        const result = eval(display);
        setDisplay(String(result));
      } catch {
        setDisplay("Error");
      }
    } else if (key === "C") {
      setDisplay("");
    } else {
      setDisplay((prev) => prev + key);
    }
  };

  return (
    <div className="calculator">
      <input type="text" value={display} className="display" readOnly />
      <div className="keys-container">
        {keys.map((key) => (
          <Button
            key={key}
            onClick={() => handleClick(key)}
            label={key}
            className={operators.includes(key) ? "operator" : ""}
          />
        ))}
      </div>
    </div>
  );
}

export default Calculator;

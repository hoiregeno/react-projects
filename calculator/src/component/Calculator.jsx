import React, { useState } from "react";

function Calculator() {
  const [displayValue, setDisplayValue] = useState("");
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
  const operators = ["+", "-", "*", "/", "=", "C"]; // include anything you want to specially style

  const handleButtonClick = (key) => {
    if (key === "=") {
      try {
        setDisplayValue(String(eval(displayValue)));
      } catch {
        setDisplayValue("Error");
      }
    } else if (key === "C") {
      setDisplayValue("");
    } else {
      setDisplayValue((v) => v + key);
    }
  };

  return (
    <div className="calculator">
      <input type="text" value={displayValue} readOnly />
      <div className="keys-container">
        {keys.map((k) => (
          <Button
            key={k}
            buttonKey={k}
            onClick={handleButtonClick}
            className={operators.includes(k) ? "operator" : ""}
          />
        ))}
      </div>
    </div>
  );
}

function Button({ buttonKey, onClick, className }) {
  return (
    <button
      className={`calc-button ${className}`}
      onClick={() => onClick(buttonKey)}
    >
      {buttonKey}
    </button>
  );
}

export default Calculator;

import React, { useState } from "react";

function Calculator() {
  //state variable to display value
  const [displayValue, setDisplayValue] = useState("");
  const keys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."];
  const operators = ["+", "-", "*", "/"];

  // arrow function to append, clear and compute.
  const handleButtonClick = (key) => {
    // if the key passed in is "=", compute.
    if (key === "=") {
      try {
        const result = eval(displayValue);
        setDisplayValue(String(result));
      } catch (error) {
        console.error(error);
        setDisplayValue("Error");
      }
    } else if (key === "C") {
      setDisplayValue(""); // if "C", clear.
    } else {
      setDisplayValue((v) => v + key); // otherwise append
    }
  };

  return (
    <div className="calculator">
      <input type="text" value={displayValue} readOnly />
      <div className="keys-container">
        {keys.map((k) => (
          <Button key={k} buttonKey={k} onClick={handleButtonClick} />
        ))}
        {operators.map((op) => (
          <Button key={op} buttonKey={op} onClick={handleButtonClick} />
        ))}
        <Button buttonKey="=" onClick={handleButtonClick} />
        <Button buttonKey="C" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

function Button({ buttonKey, onClick }) {
  return <button onClick={() => onClick(buttonKey)}>{buttonKey}</button>;
}

export default Calculator;

import React, { useState } from 'react'
import UnitsWrapper from './UnitsWrapper.jsx'
import './TempConverter.css';

function TempConverter() {
    const [temp, setTemp] = useState("");
    const [unit, setUnit] = useState("");
    const [result, setResult] = useState(null);

    const handleChange = (event) => {
        if (event.target.value === "") return;

        setTemp(Number(event.target.value));
    }

    const convertTemp = () => {
        if (!unit) {
            alert("Please select a unit to convert.");
            return;
        }

        let convertedTemp = (unit === "toFahrenheit") ?
            (((temp * 9) / 5) + 32).toFixed(2) + " °F" :
            (((temp - 32) * 5) / 9).toFixed(2) + " °C";

        setResult(convertedTemp);
        setTemp("");
    }

    return (
        <div className="container">
            <h1>Temperature Converter</h1>

            <div className="input-wrapper">
                <input
                    type="number"
                    placeholder="Enter temperature"
                    value={temp}
                    onChange={handleChange}
                />
                <button onClick={convertTemp}>Convert</button>
            </div>

            <UnitsWrapper unit={unit} setUnit={setUnit} />

            <p className="result-display">{result}</p>
        </div>

    )
}

export default TempConverter
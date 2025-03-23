import React, { useState } from 'react'

const TempConverter = () => {
    const [temp, setTemp] = useState(null);
    const [unit, setUnit] = useState("celsius");

    const convertedTemp = () => {
        return unit === "celsius" ? (temp - 32) * (5 / 9) : ((temp * 9) / 5) + 32;
    }

    const displayUnit = () => {
        return unit === "celsius" ? "F" : "C";
    }

    const displayResultUnit = () => {
        return unit === "celsius" ? "C" : "F";
    }

    return (
        <div className="wrapper">
            <h1>Temperature Converter</h1>
            <form>
                <input
                    type="number"
                    placeholder="Enter temperature"
                    value={temp}
                    onChange={e => setTemp(e.target.value)}
                />
                <select
                    name="units"
                    value={unit}
                    onChange={e => setUnit(e.target.value)}
                >
                    <option value="fahrenheit">
                        Fahrenheit
                    </option>
                    <option value="celsius">
                        Celsius
                    </option>
                </select>
            </form>

            {temp && (
                <p>
                    <b>Result:</b><br />
                    {temp}°{displayUnit()} ➡️ {convertedTemp().toFixed(2)}°{displayResultUnit()}
                </p>
            )
            }
        </div>
    )
}

export default TempConverter
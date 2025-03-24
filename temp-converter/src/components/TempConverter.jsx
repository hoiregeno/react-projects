import React, { useState } from 'react'

const TempConverter = () => {
    const [temp, setTemp] = useState('');
    const [unit, setUnit] = useState("celsius");



    const convertedTemp = () => {
        if (temp === '' || isNaN(temp)) return '';
        const tempValue = parseFloat(temp);

        return unit === "celsius"
            ? ((tempValue * 9) / 5) + 32
            : (tempValue - 32) * (5 / 9);
    };

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
                        °F
                    </option>
                    <option value="celsius">
                        °C
                    </option>
                </select>
            </form>

            {temp && (
                <p>
                    <b>Result:</b><br />
                    {temp}°{unit === "celsius" ? "C" : "F"} ➡️ {convertedTemp().toFixed(2)}°{unit === "celsius" ? "F" : "C"}
                </p>
            )
            }
        </div>
    )
}

export default TempConverter
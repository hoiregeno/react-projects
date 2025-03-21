import React, { useState } from 'react';

const TempConverter = () => {
    const [temp, setTemp] = useState(0);
    const [unit, setUnit] = useState('fahrenheit');

    // Function to convert temperature
    const convertTemperature = (temp, unit) => {
        return unit === 'fahrenheit' ? (temp - 32) * (5 / 9) : temp * (9 / 5) + 32; // Fahrenheit to Celsius : Celsius to Fahrenheit
    };

    // Convert the entered temperature based on selected unit
    const convertedTemp = convertTemperature(temp, unit);

    return (
        <>
            <form>
                <input
                    type="number"
                    placeholder="Enter temperature"
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                />
                <select name="units" value={unit} onChange={e => setUnit(e.target.value)}>
                    <option value="fahrenheit">Fahrenheit</option>
                    <option value="celsius">Celsius</option>
                </select>
            </form>

            <p>
                {temp}° {unit === 'fahrenheit' ? 'F' : 'C'} is equal to{' '}
                {convertedTemp.toFixed(2)}° {unit === 'fahrenheit' ? 'C' : 'F'}.
            </p>
        </>
    );
};

export default TempConverter;
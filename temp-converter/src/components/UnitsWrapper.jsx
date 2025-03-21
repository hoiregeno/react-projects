import UnitItem from './UnitItem.jsx'

const UnitsWrapper = ({ unit, setUnit }) => {
    return (
        <div className="wrapper">
            <UnitItem
                id="toFahrenheit"
                label="toFahrenheit"
                text="Celsius ➡️ Fahrenheit"
                unit={unit}
                setUnit={setUnit}
            />

            <UnitItem
                id="toCelsius"
                label="toCelsius"
                text="Fahrenheit ➡️ Celsius"
                unit={unit}
                setUnit={setUnit}
            />
        </div>
    )
}

export default UnitsWrapper
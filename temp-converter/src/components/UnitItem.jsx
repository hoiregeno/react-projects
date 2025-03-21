
const UnitItem = ({ id, value, text, unit, setUnit }) => {
    return (
        <div className="unit-item">
            <input
                type="radio"
                name="units"
                id={id}
                value={id}
                checked={unit === id}
                onChange={(e) => setUnit(e.target.value)}
            />
            <label htmlFor={id}>{text}</label>
        </div>
    )
}

export default UnitItem
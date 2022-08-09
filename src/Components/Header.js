//import Select from "react-select";
export const Header = (props) => {
  const handleUnits = (e) => {
    e.preventDefault();
    props.changeUnits(e.target.value);
  };

  return (
    <header>
      <i className="bx bx-left-arrow-alt"></i>
      <div className="header-detail">
        <div className="name column">Weather App</div>
        <div className="column">
          <select
            className="metricts-select"
            onChange={(e) => handleUnits(e)}
            value={props.units}
          >
            <option key={"Metric"} value="Metric">
              Metric (°C, km/h, mm)
            </option>
            <option key={"Imperial"} value="Imperial">
              Imperial (°F, mph, in)
            </option>
          </select>
        </div>
      </div>
    </header>
  );
};

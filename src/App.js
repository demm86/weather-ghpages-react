import { Header } from "./Components/Header";
import { Search } from "./Components/Search";

import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [units, setUnits] = useState("Metrics");

  useEffect(() => {
    let unitsTmp =
      localStorage.getItem("settingUnitWeather") === null
        ? "Metrics"
        : localStorage.getItem("settingUnitWeather");

    localStorage.setItem("settingUnitWeather", unitsTmp);

    setUnits(unitsTmp);
  }, []);

  useEffect(() => {
    localStorage.setItem("settingUnitWeather", units);
  }, [units]);

  const changeUnits = (e) => {
    localStorage.setItem("settingUnitWeather", e.coords);
    return setUnits(e);
  };

  return (
    <div className="wrapper active">
      <Header changeUnits={changeUnits} units={units}></Header>
      <Search units={units}></Search>
    </div>
  );
}

export default App;

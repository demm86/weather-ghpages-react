import { DayForecast } from "./DayForecast";

export const Forecast = ({ forecast = [], units }) => {
  const days = forecast.map((day) => (
    <DayForecast key={day.date} day={day} units={units} />
  ));

  return (
    <section className="weather-part" style={{ display: forecast.length>0 ?"flex":"none"}}>
      <div className="bottom-details">
        <div id="ForecastDiv" className="column">
          {days}
        </div>
      </div>
    </section>
  );
};

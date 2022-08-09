import "../App.css";
export const Weather = ({ weather = [], units }) => {


  return (
    <section className="weather-part" style={{ display: weather.length === 0 ?"none":"flex"}}>
      <img src={weather.wIconsrc} alt="Weather Icon" />
      <div className="temp">
        <span className="numb metric">
          {units === "Metric" ? weather.tempC : weather.tempF}
        </span>
        <span className="deg">°</span>
      </div>
      <div className="weather">{weather.description}</div>
      <div className="location">
        <i className="bx bx-map"></i>
        <span>{weather.city + ", " + weather.country}</span>
      </div>
      <div className="bottom-details">
        <div className="column feels">
          <i className="bx bxs-thermometer"></i>
          <div className="details">
            <div className="temp">
              <span className="numb-2 metric">
                {units === "Metric" ? weather.feels_likeC : weather.feels_likeF}
              </span>
              <span className="deg">°</span>
            </div>
            <p>Feels like</p>
          </div>
        </div>
        <div className="column humidity">
          <i className="bx bxs-droplet-half"></i>
          <div className="details">
            <span>{weather.humidity}</span>
            <p>Humidity</p>
          </div>
        </div>

        <div className="column wind">
          <i className="bx bxl-tailwind-css"></i>
          <div className="details">
            <span className="numb metric">
              {units === "Metric" ? weather.windK : weather.windM}
            </span>
            <p>Wind</p>
          </div>
        </div>
      </div>
    </section>
  );
};

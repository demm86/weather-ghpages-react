import { useState, useEffect } from "react";
import { Weather } from "./Weather";
import { Forecast } from "./Forecast";
import {
  weather,
  forecast,
  weatherLatLon,
  forecastLatLon,
} from "../Services/weatherApi";
export const Search = ({ units }) => {
  const [currentWeather, setCurrentWeather] = useState([]);
  const [currentForecast, setCurrentForcast] = useState([]);
  const [currentCity, setCurrentCity] = useState("");
  const [error, setError] = useState();
  const [statusError, setStatusError] = useState("none");
  const [statusProcess, setStatusProcess] = useState("none");



  useEffect(() => {
    setCurrentCity(currentWeather.city);
  }, [currentWeather]);

  const handleChangeInput = (e) => {
    setCurrentCity(e.target.value);
  };

  const handleError = (e) => {
    setError(e.message);
    setStatusError("block");
  };

  const formatCurrentWeather = (res) => {
    return {
      city: res.location.name,
      country: res.location.country,
      description: res.current.condition.text,
      tempC: Math.floor(res.current.tempC),
      tempF: Math.floor(res.current.tempF),
      feels_likeC: Math.floor(res.current.feelslikeC),
      feels_likeF: Math.floor(res.current.feelslikeF),
      humidity: res.current.humidity,
      windK: res.current.windKph,
      windM: res.current.windMph,
      wIconsrc: "http:" + res.current.condition.icon,
    };
  };

  const formatCurrentForecast = (res) => {
    return res.forecast.forecastday.map((element) => ({
      icon: element.day.condition.icon,
      date: element.date,
      maxtempC: element.day.maxtempC,
      maxtempF: element.day.maxtempF,
      mintempC: element.day.mintempC,
      mintempF: element.day.mintempF,
    }));
  };

  const handleLocationButton = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, handleError);
    } else {
      alert("Your browser not support geolocation api");
    }
  };

  const onSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    setStatusProcess("block");
    setStatusError("block");
    weatherLatLon(latitude, longitude)
      .then((res) => setCurrentWeather(formatCurrentWeather(res)))
      .then(() => {
        forecastLatLon(latitude, longitude)
          .then((res) => {
            setCurrentForcast(formatCurrentForecast(res));
          })
          .catch((e) => {
            handleError(e);
          });
      })
      .catch((e) => {
        handleError(e);
      })
      .finally(() => {
        setStatusProcess("none");
      });
  };

  const weatherCity = (e) => {
    if (e.key === "Enter") {
      setStatusProcess("block");
      setStatusError("none");

      weather(e.target.value)
        .then((res) => {
          setCurrentWeather(formatCurrentWeather(res));
        })
        .then(() => {
          forecast(e.target.value)
            .then((res) => {
              setCurrentForcast(formatCurrentForecast(res));
            })
            .catch((e) => {
              handleError(e);
            });
        })
        .catch((e) => {
          handleError(e);
        })
        .finally(() => {
          setStatusProcess("none");
        });
    }
  };

  const processingStyle = {
    display: statusProcess,
  };
  const errorStyle = {
    display: statusError,
  };

  return (
    <>
      <section className="input-part">
        <p className="info-txt error" style={errorStyle}>
          {error}
        </p>
        <p className="info-txt pending" style={processingStyle}>
          Loading data ...
        </p>
        <div className="content">
          <div className="tooltip">
            <input
              type="text"
              placeholder="Enter city, country or zipcode and press enter"
              value={currentCity || ""}
              onChange={handleChangeInput}
              onKeyDownCapture={weatherCity}
            />
            <span className="tooltiptext">Press enter</span>
          </div>
          <div className="separator"></div>
          <button onClick={(e) => handleLocationButton(e)}>Get Location</button>
        </div>
      </section>

      <Weather weather={currentWeather} units={units} />
      <Forecast forecast={currentForecast} units={units} />
    </>
  );
};

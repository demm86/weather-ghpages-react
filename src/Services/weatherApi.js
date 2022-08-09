import { API_URL } from "./settings";

export const weather = (city) => {
  let api = `${API_URL}/Current?location=${city}`;
  return fetchDataWeather(api);
};

export const forecast = (city) => {
  let api = `${API_URL}/CurrentForecast?location=${city}`;
  return fetchDataWeather(api);
};

export const weatherLatLon = (latitude,longitude) => {
  let api = `${API_URL}/Current?location=${latitude},${longitude}`;
  return fetchDataWeather(api);
};

export const forecastLatLon = (latitude,longitude) => {
  let api = `${API_URL}/CurrentForecast?location=${latitude},${longitude}`;
  return fetchDataWeather(api);
};

const fetchDataWeather = (api) => {
  return fetch(api).then((res) => res.json());
};

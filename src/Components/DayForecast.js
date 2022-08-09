import moment from "moment";

export const DayForecast = ({ day = [], units }) => {
 

  return (
    
    <div >
      <img src={"http:" + day.icon} alt="Weather Icon"></img>
      <span className="day"> {moment(day.date).format("dddd")}</span>
      <hr />
      <span className="numb">
        {units === "Metric" ? day.maxtempC : day.maxtempF} °{" "}
      </span>
      <br></br>
      <span className="numb">
        {units === "Metric" ? day.mintempC : day.mintempF} °{" "}
        
      </span>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { Button, Radio, Select } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import "./Weather.css";

const { Option } = Select;
export default function WeatherApp() {
  const [cityName, setCityName] = useState([]);
  const [temparature, setTemperature] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [cityDegree, setCityDegree] = useState("Celsius");
  const [weather, setWeather] = useState({});
  useEffect(() => {
    const options = {
      method: "GET",
      params: { limit: "5" },
      url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
      headers: {
        "x-rapidapi-key": "1a98f9df39msh95cbda497660476p1a7263jsn1928cdd74873",
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
      },
    };
    axios.request(options).then(function (response) {
      setCityList(response.data.data);
    });
  }, []);
  function cityNameStore(event) {
    setCityName(event);
  }
  function degreeSave(value) {
    setCityDegree(value.target.value);
  }
  const options = cityList
    ? cityList.map((k) => (
        <Option key={k.id} value={k.city} style={{ paddingRight: "0px" }}>
          {k.city},{k.region},{k.country}
        </Option>
      ))
    : [];

  const degrees = [
    { label: <span className="radioLabel">Celsius</span>, value: "Celsius" },
    {
      label: <span className="radioLabel">Fahrenheit</span>,
      value: "Fahrenheit ",
    },
  ];

  function searchTemp() {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${
          cityDegree === "Celsius" ? "metric" : "imperial"
        }&appid=8611a2478e30b28a4764785e6b6843dd`
      )
      .then((response) => {
        setTemperature(response.data ? response.data.main : []);
        setWeather(response.data);
      });
  }

  return (
    <div style={{ display: "flex", padding: "24px", width: "600px" }}>
      <div>
        <div className="title">Weather Information</div>
        <div className="componentStyle">
          <Select
            showSearch
            onChange={(e) => {
              cityNameStore(e);
            }}
            style={{ width: 300 }}
            // className="cityInput"
          >
            {options}
          </Select>
        </div>
        <div className="componentStyle">
          <Radio.Group
            options={degrees}
            value={cityDegree}
            onChange={(e) => {
              degreeSave(e);
            }}
          />
        </div>
        <div className="componentStyle">
          <Button
            className="buttonStyle"
            onClick={(e) => {
              searchTemp();
            }}
            type="primary"
            size="large"
          >
            Search
          </Button>
        </div>
      </div>
      <div>
        {weather.weather ? (
          <div>
            <div className="imagePanel">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
            </div>
            <div style={{ display: "flex" }}>
              <div className="weatherLabel"> Temperature: </div>
              <div className="weatherValue">
                {temparature.temp}{" "}
                {temparature.temp ? (
                  <sup>&deg; {cityDegree === "Celsius" ? "C" : "F"}</sup>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div className="weatherLabel"> Humidity: </div>
              <div className="humidityValue">
                {temparature.humidity ? temparature.humidity : "-"}
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div className="weatherLabel"> Feels Like: </div>
              <div className="feelsLikeValue">
                {temparature.feels_like ? temparature.feels_like : "-"}
                <sup>&deg; {cityDegree === "Celsius" ? " C" : " F"}</sup>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

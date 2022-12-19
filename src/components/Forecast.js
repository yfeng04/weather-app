import React from 'react';
//import moment from 'moment';
//import styled from 'styled-components';

function Forecast({forecastData}) {
  const displayResults = (content) => {
    if (content) {
        return forecastData.list.map((item, id) => 
        <div className="forecast-item" key={id}>
            <p>{new Date(item.dt * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
            <img className="forecast-icon" src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="Weather Icon"/>
            <p>{item.main.temp.toFixed(1)} &deg;C</p>
        </div>  
      )
    } 
  }

  return (
    <div className='forecast-row'>
      {forecastData ? displayResults(forecastData) : 'no data'}
    </div>

  )
}
 
export default Forecast;
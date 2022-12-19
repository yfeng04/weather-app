import React from 'react';
import moment from 'moment';
import {Icon} from 'semantic-ui-react';

function Weather({weatherData, getLocation}) {
    
    const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    
    return (
    <div className="current-weather">
       <div className='weather-info-1'>
            <div className='button-row' onClick={getLocation}>
                <Icon size="small" name='location arrow'/>
                <span>Get Current Location</span>
            </div>
            <p className="location">{weatherData.name}, {weatherData.sys.country}</p>
            <p className="day">{moment().format('hh:mm A - dddd MMM D, YYYY')}</p>
            <img className="weather-icon" src= {iconUrl} alt="Weather Icon"/>
            <p className="temp">{weatherData.main.temp.toFixed(1)}&deg;C <span className='temp-range'>{weatherData.main.temp_max.toFixed(1)}&deg; / {weatherData.main.temp_min.toFixed(1)}&deg;C</span></p>
            <p>Feels like: {weatherData.main.feels_like.toFixed(1)}&deg;C. <span className="description">{weatherData.weather[0].description}</span></p>
       </div>

        <div className='weather-info-2'>
            <p className="flex-row">Sunrise <span className="data">{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span></p>
            <p className="flex-row">Sunset <span className='data'>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span></p>
            <hr/>
            <p className='flex-row'>Humidity <span className="data">{weatherData.main.humidity} %</span></p>
            <p className='flex-row'>Air Pressure <span className="data">{weatherData.main.pressure} hPa</span></p>
            <p className='flex-row'>Wind Speed <span className="data">{weatherData.wind.speed} km/h</span></p>
            <p className='flex-row'>Visibility <span className="data">{(weatherData.visibility/1000).toFixed(1)} km</span></p>
        </div>
    </div>
    )
}

export default Weather;
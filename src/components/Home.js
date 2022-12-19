import React, { useEffect, useState } from "react";
import Weather from './Weather';
import Forecast from './Forecast';
import { API_KEY, API_URL } from '../utilities/globals';
import { Dimmer, Loader } from 'semantic-ui-react';
//import { createClient } from 'pexels';
import clouds from '../images/clouds.jpg';
import mist from '../images/mist.jpg';
import clear from '../images/clear.jpg';
import rain from '../images/rain.jpg';
import drizzle from '../images/drizzle.jpg';
import snow from '../images/snow.jpg';
import thunderstorm from '../images/thunderstorm.jpg';

function Home() {
    const [lat, setLat] = useState(49.2827);
    const [long, setLong] = useState(-123.1207);
    const [weatherData, setWeatherData] = useState([]);
    const [forecastData, setForecast] = useState([]);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('Clouds');
    const [background, setBackground] = useState('');
    //const client = createClient(PEXELS_KEY);
    
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        console.log(lat, long);
      });
    }

    useEffect(() => { 
      function handleResponse(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Please Enable your Location in your browser!");
        }
      }
        
      const getWeather = async () => {
        await fetch(`${API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${API_KEY}`)
        .then(res => handleResponse(res))
        .then(result => {
          setWeatherData(result);
          setError(null);
          setQuery(result.weather[0].main)
          console.log(result);
          console.log(query);
        })
        .catch(err => {
          setError(err.message);
        });

        //get background image
        // client.photos.search({ query, per_page: 1, page: 3})
        // .then(res=> {
        //   setBackground(res.photos[0].src.landscape);
        //   console.log(res.photos[0].src.landscape);
        // });
        if (query === 'Thunderstorm') {
          setBackground(thunderstorm)
        }else if (query === 'Drizzle') {
          setBackground(drizzle)
        } else if (query === 'Rain') {
          setBackground(rain)
        } else if (query === 'Snow') {
          setBackground(snow)
        } else if (query === 'Clear') {
          setBackground(clear)
        } else if (query === 'Clouds') {
          setBackground(clouds)
        } else {
          setBackground(mist)
        }
      }
  
      const getForecast = async () => {
        await fetch(`${API_URL}/forecast/?lat=${lat}&lon=${long}&cnt=5&units=metric&appid=${API_KEY}`)
        .then(res => handleResponse(res))
        .then(result => {
          setForecast(result);
          setError(null);
          console.log(result);
        })
        .catch(err => {
          setError(err.message);
        });
      }
      getWeather();
      getForecast();
     
    }, [lat, long, query])
  
    console.log(error);

    return (
        <>
        {(Object.keys(weatherData).length !==0 && Object.keys(forecastData).length !== 0) ? (
          // <div className="wrapper" style={{ backgroundImage: `url(https://source.unsplash.com/random/?snow/1920x1080` }}>
          <div className="wrapper" style={{ backgroundImage: `url(${background})`}}>
            <div className='container content-wrapper'>
              <Weather weatherData={weatherData} getLocation={getLocation}/> 
              <Forecast forecastData={forecastData}/>
            </div>
          </div>
        ): (
          <>
            <Dimmer active>
              <Loader>Loading..</Loader>
            </Dimmer>
         </>
       )}
       </>
    );
  }

export default Home;
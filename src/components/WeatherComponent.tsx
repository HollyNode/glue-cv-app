import React from 'react';
import ReactWeather, { useOpenWeather } from 'react-open-weather';

const WeatherComponent: React.FC = () => {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: 'e2566ca4e86ba4028acd071469116249', 
    lat: '48.137154', 
    lon: '11.576124',
    lang: 'en',
    unit: 'metric', 
  });

 
  return (
    <div className="weather-container">
      {/*<ReactWeather
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang="en"
        locationLabel="Munich"
        unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
        showForecast
      />*/}
    </div>
  );
};

export default WeatherComponent;
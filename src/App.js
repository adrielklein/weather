import React, { useState, useEffect } from 'react';
import Forecast from './Forecast';
import axios from 'axios';
import _ from 'lodash';
import { geolocated } from 'react-geolocated';

const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const getRequestParameters = ({ query, selectedOption }) => {
  const result = { APPID: '6e3d46c3297a91e7de6d22cb4e483570', units: 'imperial' };
  if (selectedOption === 'city') {
    result.q = `${query},us`;
  } else {
    const [lat, lon] = query.split(',');
    result.lat = lat.trim();
    result.lon = lon.trim();
  }
  return result;
};

function App({ isGeolocationEnabled, coords }) {
  const [query, setQuery] = useState();
  const [predictions, setPredictions] = useState();
  const [city, setCity] = useState();
  const [selectedOption, setSelectedOption] = useState('city');
  const [isLoading, setIsLoading] = useState(false);

  const fetchPredictions = async ({ query, selectedOption }) => {
    setIsLoading(true);
    const data = await axios.get(API_URL, {
      params: getRequestParameters({ query, selectedOption })
    });
    setPredictions(data.data.list);
    setCity(data.data.city);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isGeolocationEnabled && coords) {
      fetchPredictions({
        query: `${coords.latitude}, ${coords.longitude}`,
        selectedOption: 'coordinates'
      });
    }
  }, [coords]);

  const handleSearch = async () => {
    if (!query) {
      return;
    }
    try {
      await fetchPredictions({ query, selectedOption });
    } catch (error) {
      const defaultMessage =
        'An error occured while searching for the forecast';
      alert(_.get(error, 'response.data.message', defaultMessage));
    }
    setIsLoading(false);
  };
  const handleSetSelectedOption = option => {
    setSelectedOption(option);
    setQuery('');
  };
  return (
    <div style={{ display: 'grid', padding: '20px' }}>
      <h1>Weather</h1>
      <label>Search By...</label>
      <div>
        <input
          type="radio"
          value="cityName"
          checked={selectedOption === 'city'}
          onChange={() => handleSetSelectedOption('city')}
        />
        City
      </div>
      <div>
        <input
          type="radio"
          value="coordinates"
          checked={selectedOption === 'coordinates'}
          onChange={() => handleSetSelectedOption('coordinates')}
        />
        Coordinates
      </div>
      <div>
        <input
          type="text"
          placeholder={
            selectedOption === 'city' ? 'San Francisco' : '40.7128, -74.0060'
          }
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <Forecast isLoading={isLoading} predictions={predictions} city={city} />
    </div>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(App);

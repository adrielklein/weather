import React, { useState, useEffect } from 'react';
import Forecast from './Forecast';
import axios from 'axios';
import _ from 'lodash';
import { geolocated } from 'react-geolocated';
import { getRequestParameters } from './utils/requestFormatter';
import Search from './Search';

const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

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
      <Search
        selectedOption={selectedOption}
        handleSetSelectedOption={handleSetSelectedOption}
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
      {predictions && city && (
        <Forecast isLoading={isLoading} predictions={predictions} city={city} />
      )}
    </div>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(App);

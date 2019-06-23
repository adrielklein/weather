import React from 'react';

const Search = ({
  selectedOption,
  handleSetSelectedOption,
  query,
  setQuery,
  handleSearch
}) => (
  <>
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
  </>
);
export default Search;

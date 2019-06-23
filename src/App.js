import React, {useState} from 'react';
import Forecast from "./Forecast";
import axios from 'axios';
import _ from 'lodash';

const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

function App() {
    const [query, setQuery] = useState();
    const [predictions, setPredictions] = useState();
    const [city, setCity] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleSearchForCity = async () => {
        setIsLoading(true);
        try {
            const data = await axios.get(API_URL, {
                params: {
                    q: `${query},us`,
                    APPID: 'cea8a222fb5dfc35ac3e87b2e9ffaae5',
                }
            });
            setPredictions(data.data.list);
            setCity(data.data.city);
        } catch (error) {
            const defaultMessage = 'An error occured while searching for the forecast';
            alert(_.get(error, 'response.data.message', defaultMessage));
        }
        setIsLoading(false);
    }
    return (
        <div style={{display: 'grid', padding: '20px'}}>
            <h1>Weather</h1>
            <div>
                <label>Search By City</label>
                <input type="text" value={query} onChange={(event) => setQuery(event.target.value)}/>
                <button onClick={handleSearchForCity}>Search</button>
            </div>
            {/*<div>*/}
            {/*    <label>Search By Coordinates</label>*/}
            {/*    <input/>*/}
            {/*    <button>Search</button>*/}
            {/*</div>*/}
            <Forecast isLoading={isLoading} predictions={predictions} city={city}/>
        </div>
    );
}

export default App;

import React from 'react';
import Forecast from "./Forecast";

function App() {
    return (
        <div style={{display: 'grid', padding: '20px'}}>
            <h1>Weather</h1>
            <div>
                <label>Search By City</label>
                <input/>
                <button>Search</button>
            </div>
            <div>
                <label>Search By Coordinates</label>
                <input/>
                <button>Search</button>
            </div>
            <Forecast />
        </div>
    );
}

export default App;

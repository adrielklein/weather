import React from 'react';

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '200px 100px 100px',
    gridGap: '20px',
};

function Forecast({predictions, city, isLoading}) {
    if (!predictions || !city){
        return 'No results to display'
    }
    if (isLoading){
        return 'Loading...'
    }
    return (
        <div style={{
            display: 'grid',
        }}>
            <h2>Showing results for {city.name} (Coordinates {city.coord.lat} Lat {city.coord.lon} Long)</h2>
            <div style={gridStyle}>
                <div><b>time</b></div>
                <div><b>temperature</b></div>
                <div><b>description</b></div>
            </div>
            {predictions.map(prediction => <div
                key={prediction.dt_txt}
                style={gridStyle}>
                <div>{prediction.dt_txt}</div>
                <div>{prediction.main.temp}</div>
                <div>{prediction.weather[0].main}</div>

            </div>)}
        </div>
    );
}

export default Forecast;

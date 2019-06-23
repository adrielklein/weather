import React from 'react';

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '200px 140px 100px 100px 100px',
    gridGap: '20px',
};

function Forecast({predictions, city, isLoading}) {
    if (isLoading){
        return <div style={{ paddingTop: '10px'}}>Loading...</div>
    }

    if (!predictions || !city){
        return ''
    }
    return (
        <div style={{
            display: 'grid',
        }}>
            <h2>Showing results for {city.name} ({city.coord.lat}, {city.coord.lon})</h2>
            <div style={gridStyle}>
                <div><b>Time</b></div>
                <div><b>Temperature (°F)</b></div>
                <div><b>Description</b></div>
                <div><b>Humidity</b></div>
                <div><b>Pressure</b></div>
            </div>
            {predictions.map(prediction => <div
                key={prediction.dt_txt}
                style={gridStyle}>
                <div>{prediction.dt_txt}</div>
                <div>{prediction.main.temp}</div>
                <div>{prediction.weather[0].main}</div>
                <div>{prediction.main.humidity}%</div>
                <div>{prediction.main.pressure}</div>

            </div>)}
        </div>
    );
}

export default Forecast;

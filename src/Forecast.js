import React from 'react';

const predictions = [{
    "dt": 1561323600,
    "main": {
        "temp": 297.6,
        "temp_min": 297.6,
        "temp_max": 298.152,
        "pressure": 1007.73,
        "sea_level": 1007.73,
        "grnd_level": 970.38,
        "humidity": 84,
        "temp_kf": -0.55
    },
    "weather": [
        {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
        }
    ],
    "dt_txt": "2019-06-23 21:00:00"
}]

const city = {
    "id": 4409896,
    "name": "Springfield",
    "coord": {
        "lat": 37.2167,
        "lon": -93.2921
    },
    "country": "US",
    "population": 159498,
    "timezone": -18000
};
function Forecast() {
    return (
        <div style={{
                display: 'grid',
        }}>
            <h2>Showing results for {city.name} (Coordinates {city.coord.lat} Lat {city.coord.lon} Long)</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '100px 100px 100px',
                gridGap: '10px',
            }}>
                <div><b>time</b></div>
                <div><b>temperature</b></div>
                <div><b>description</b></div>
            </div>
            {predictions.map(prediction => <div style={{
                display: 'grid',
                gridTemplateColumns: '100px 100px 100px',
                gridGap: '10px',
            }}>
                <div>{prediction.dt_txt}</div>
                <div>{prediction.main.temp}</div>
                <div>{prediction.weather[0].main}</div>

            </div>)}
        </div>
    );
}

export default Forecast;

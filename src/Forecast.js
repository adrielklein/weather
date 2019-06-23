import React from 'react';

function Forecast() {
    return (
        <div style={{
                display: 'grid',
        }}>
            <h2>Showing results for Boston (Coordinates 34LONG 343 LAT)</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '100px 100px 100px',
                gridGap: '10px',
            }}>
                <div><b>time</b></div>
                <div><b>temperature</b></div>
                <div><b>description</b></div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '100px 100px 100px',
                gridGap: '10px',
            }}>
                <div>3PM</div>
                <div>34 defrees F</div>
                <div>cloudy</div>
            </div>
        </div>
    );
}

export default Forecast;

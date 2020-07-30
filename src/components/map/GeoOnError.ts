import { useState } from 'react';

const GeoOnError = (error: any) => {
    const [state,setState] = useState({
        accuracy: null,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: 37.4882,
        longitude: 127.1026,
        speed: null,
        timestamp: Date.now(),
        error: false,
    });
    setState({ ...state, error: error.message });
    console.log('error: ', error);
    return state;
};

export default GeoOnError;
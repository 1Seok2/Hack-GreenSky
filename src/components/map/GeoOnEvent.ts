import { useState } from 'react';

const GeoOnEvent = (event: any) => {
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
    if (true) {
        setState({
            ...state,
            accuracy: event.coords.accuracy,
            altitude: event.coords.altitude,
            altitudeAccuracy: event.coords.altitudeAccuracy,
            heading: event.coords.heading,
            latitude: event.coords.latitude,
            longitude: event.coords.longitude,
            speed: event.coords.speed,
            timestamp: event.timestamp,
        });
    }
    return state;
};

export default GeoOnEvent;
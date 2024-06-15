import {useEffect, useRef, useState} from 'react';
import {DirectionsRenderer, GoogleMap, Marker} from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100vw',
    height: '80vh',
};

const center = {
    lat: 52.2318813,
    lng: 21.0024811,
};

const options = {
    disableDefaultUI: true,
    gestureHandling: 'greedy',
};

const MapComponent = () => {
    const [directions, setDirections] = useState(null);

    const markerRef = useRef(null);

    useEffect(() => {
        calculateRoute();
    }, []);

    const calculateRoute = () => {
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
            {
                origin: {lat: 52.2449687, lng: 21.0666929},
                destination: {lat: 52.2318813, lng: 21.0024811},
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                console.log(JSON.stringify(result))
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setDirections(result);
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    };

    return (
        <>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={center}
                options={options}
            >
                <Marker ref={markerRef} position={{lat: 52.2449687, lng: 21.0666929}}/>
                <Marker ref={markerRef} position={{lat: 52.2318813, lng: 21.0024811}}/>
                {directions && (
                    <DirectionsRenderer
                        directions={directions}
                    />
                )}
            </GoogleMap>
        </>
    );
};

export default MapComponent;

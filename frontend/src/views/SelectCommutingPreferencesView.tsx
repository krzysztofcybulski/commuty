import {GoogleMap, useLoadScript} from "@react-google-maps/api";

export const SelectCommutingPreferencesView = () => {

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ["places"]
    });

    const options = {
        disableDefaultUI: true,
        gestureHandling: 'greedy',
    };

    const center = {
        lat: 52.2318813,
        lng: 21.0024811,
    };

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps</div>;

    return (
        <div className="flex-col">
            <div>dfa</div>
            <div>
                <GoogleMap
                    mapContainerStyle={{
                        width: '100vw',
                        height: '50vh',
                    }}
                    zoom={14}
                    options={options}
                    center={center}
                >
                </GoogleMap>
            </div>
        </div>
    );
};

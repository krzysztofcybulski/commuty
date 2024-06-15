import './App.css'
import {PlaceholdersAndVanishInput} from "./components/placeholders-and-varnish-input.tsx";
import {useState} from "react";
import MapComponent from "./components/MapComponent.tsx";
import {Autocomplete, useLoadScript} from "@react-google-maps/api";

function App() {

    const [startingPoint, setStartingPoint] = useState("");
    const [autocomplete, setAutocomplete] = useState(null);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ["places"]
    });

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps</div>;


    const onLoad = (autocompleteInstance) => {
        setAutocomplete(autocompleteInstance);
    };

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            // const place = autocomplete.getPlace();
            // const location = place.geometry.location;
            // const newMarker = { lat: location.lat(), lng: location.lng() };
            // setMarkers([...markers, newMarker]);
            // calculateRoute();
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    };

    return <div className="mt-40">
        <div className="mb-16 mr-4 ml-4">
            <Autocomplete
                onLoad={onLoad}
                onPlaceChanged={onPlaceChanged}
            >
                <PlaceholdersAndVanishInput
                    className="mb-4"
                    placeholders={["What is your starting point?"]}
                    onChange={(e) => {
                        setStartingPoint(e.target.value)
                    }}
                    onSubmit={() => {
                    }}
                />
            </Autocomplete>
            <PlaceholdersAndVanishInput
                className="mb-4"
                placeholders={["Where are you going?"]}
                onChange={(e) => {
                    setStartingPoint(e.target.value)
                }}
                onSubmit={() => {
                }}
            />
        </div>
        <MapComponent/>
    </div>

}

export default App

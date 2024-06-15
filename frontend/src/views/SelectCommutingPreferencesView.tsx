import {Autocomplete, DirectionsRenderer, GoogleMap, MarkerF, useLoadScript} from "@react-google-maps/api";
import {TypographyH2} from "../components/TypographyH2.tsx";
import {TypographyH4} from "../components/TypographyH4.tsx";
import {SimpleInput} from "../components/Input.tsx";
import {Point, useFindRoute} from "../hooks/useFindRoute.ts";
import {useEffect, useState} from "react";

export const SelectCommutingPreferencesView = () => {

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ["places"]
    });

    const [directions, setDirections] = useState<any>(null)
    const findRoute = useFindRoute({setDirections: setDirections})
    const [startingAutocomplete, setStartingAutocomplete] = useState<any>(null);
    const [destinationAutocomplete, setDestinationAutocomplete] = useState<any>(null);
    const [startingPoint, setStartingPoint] = useState<Point | undefined>(undefined);
    const [destinationPoint, setDestinationPoint] = useState<Point | undefined>(undefined);

    const handleAutocompleteChange = (autocomplete: any): Point | undefined => {
        if (autocomplete !== null) {
            const location = autocomplete.getPlace().geometry.location
            return {
                lat: location.lat(),
                lng: location.lng(),
            }
        } else {
            console.log('Autocomplete is not loaded yet!');
            return undefined
        }
    }

    useEffect(() => {
        if (startingPoint && destinationPoint) {
            findRoute(startingPoint!, destinationPoint!)
        }
    }, [startingPoint, destinationPoint]);

    const options = {
        disableDefaultUI: true,
        gestureHandling: 'greedy',
    };

    const center = {
        lat: 52.2318813,
        lng: 21.0324811,
    };

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps</div>;

    const startingPointChanged = () => {
        const point = handleAutocompleteChange(startingAutocomplete);
        setStartingPoint(point)
    };

    const destinationChanged = () => {
        const point = handleAutocompleteChange(destinationAutocomplete);
        setDestinationPoint(point)
    };

    return (
        <div className="flex-col max-h-full">
            <div style={{height: '45vh'}} className="p-8">
                <TypographyH2 text={"Where are you commuting?"}/>
                <TypographyH4 text={"Don't worry we will keep it private"}/>
                <div className="flex-col space-y-4 pt-16">
                    <TypographyH4 text={"I’m going from"}></TypographyH4>
                    <Autocomplete
                        onLoad={(e) => setStartingAutocomplete(e)}
                        onPlaceChanged={startingPointChanged}
                    >
                        <SimpleInput placeholders={["Start typing address..."]} onChange={(e) => {
                            console.log(e)
                        }}/>
                    </Autocomplete>
                    <TypographyH4 text={"To"}></TypographyH4>
                    <Autocomplete
                        onLoad={(e) => setDestinationAutocomplete(e)}
                        onPlaceChanged={destinationChanged}
                    >
                        <SimpleInput placeholders={["Add your work location..."]} onChange={() => {
                        }}/>
                    </Autocomplete>
                </div>
            </div>
            <GoogleMap
                mapContainerStyle={{
                    width: '100vw',
                    height: '65vh',
                }}
                options={options}
                zoom={14}
                center={center}
            >
                {directions && (
                    <DirectionsRenderer
                        directions={directions}
                    />
                )}
            </GoogleMap>
        </div>
    );
};

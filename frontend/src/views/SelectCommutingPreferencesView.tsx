import {Autocomplete, DirectionsRenderer, GoogleMap, useLoadScript} from "@react-google-maps/api";
import {TypographyH2} from "../components/TypographyH2.tsx";
import {TypographyH4} from "../components/TypographyH4.tsx";
import {Point, useFindRoute} from "../hooks/useFindRoute.ts";
import {useEffect, useState} from "react";
import {updateAddressFrom, updateAddressTo, updateView} from "../store/appReducer.ts";
import {useAppDispatch} from "../store/store.ts";
import {ContinueButton} from "../components/ContinueButton.tsx";

export const SelectCommutingPreferencesView = () => {

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        id: '982eaad930f4790c',
        libraries: ["places"]
    });

    const [directions, setDirections] = useState<any>(null)
    const findRoute = useFindRoute({setDirections: setDirections})
    const [startingAutocomplete, setStartingAutocomplete] = useState<any>(null);
    const [destinationAutocomplete, setDestinationAutocomplete] = useState<any>(null);
    const [startingPoint, setStartingPoint] = useState<Point | undefined>(undefined);
    const [destinationPoint, setDestinationPoint] = useState<Point | undefined>(undefined);
    const dispatch = useAppDispatch()

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
        mapId: 'fbd0e4c5778bb4b3'
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
        dispatch(updateAddressFrom(point))
    };

    const destinationChanged = () => {
        const point = handleAutocompleteChange(destinationAutocomplete);
        setDestinationPoint(point)
        dispatch(updateAddressTo(point))
    };

    const onContinueClick = () => {
        dispatch(updateView('WHEN_YOU_ARE_GOING'))
    }

    return (
        <div className="flex-col max-h-full">
            <div style={{height: '50vh'}} className="p-8">
                <TypographyH2 text={"Where are you commuting?"}/>
                <TypographyH4 text={"Don't worry we will keep it private"}/>
                <div className="flex-col space-y-4 pt-16">
                    <TypographyH4 text={"I’m going from"}></TypographyH4>
                    <Autocomplete
                        onLoad={(e) => setStartingAutocomplete(e)}
                        onPlaceChanged={startingPointChanged}
                    >

                        <input type="text" id="large-input"
                               placeholder="Start typing address..."
                               className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </Autocomplete>
                    <TypographyH4 text={"To"}></TypographyH4>
                    <Autocomplete
                        onLoad={(e) => setDestinationAutocomplete(e)}
                        onPlaceChanged={destinationChanged}
                    >
                        <input type="text" id="large-input"
                               placeholder="Add your work location..."
                               className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </Autocomplete>
                </div>
            </div>
            <div style={{
                position: 'relative',
                width: '100vw',
                height: '65vh',
            }}>
                {/*
    const buttonStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', // Centers the button exactly in the middle
        zIndex: 10, // Ensures the button is above the map layer
    };

                */}
                <ContinueButton className="absolute z-10 top-1/2 min-w-0 w-3/4 ml-12 mr-12" onClick={onContinueClick}/>
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
        </div>
    );
};

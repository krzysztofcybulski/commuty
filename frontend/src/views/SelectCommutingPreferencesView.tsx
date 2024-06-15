import {GoogleMap, MarkerF, useLoadScript} from "@react-google-maps/api";
import {TypographyH2} from "../components/TypographyH2.tsx";
import {TypographyH4} from "../components/TypographyH4.tsx";
import {PlaceholdersAndVanishInput} from "../components/Input.tsx";

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
        lng: 21.0324811,
    };

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps</div>;

    return (
        <div className="flex-col">
            <div style={{ height: '50vh' }} className="p-8">
                <TypographyH2 text={"Where are you commuting?"}/>
                <TypographyH4 text={"Don't worry we will keep it private"}/>
                <div className="flex-col space-y-4 pt-16">
                    <TypographyH4 text={"I’m going from"}></TypographyH4>
                    <PlaceholdersAndVanishInput placeholders={["Start typing address..."]} onChange={() => {}}/>
                    <TypographyH4 text={"To"}></TypographyH4>
                    <PlaceholdersAndVanishInput placeholders={["Add your work location..."]} onChange={() => {}}/>
                </div>
            </div>
            <GoogleMap
                mapContainerStyle={{
                    width: '100vw',
                    height: '50vh',
                }}
                zoom={13}
                options={options}
                center={center}
            >
                <MarkerF position={{lat: 52.2449687, lng: 21.0666929}}/>
                <MarkerF position={{lat: 52.2318813, lng: 21.0024811}}/>
            </GoogleMap>
        </div>
    );
};

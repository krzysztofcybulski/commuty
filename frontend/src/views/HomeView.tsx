import {FoundMatches} from '../components/FoundMatches.tsx';
import {SignOutButton} from '@clerk/clerk-react';
import {RouteMap} from "../components/RouteMap.tsx";
import {useState} from "react";
import {Point} from "../hooks/useFindRoute.ts";
import {useLoadScript} from "@react-google-maps/api";

export const HomeView = () => {

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        id: '982eaad930f4790c',
        libraries: ['places'],
    });

    const [startingPoint, setStartingPoint] = useState<Point | undefined>({
        lat: 52.249472,
        lng: 21.098527,
    });
    const [destinationPoint, setDestinationPoint] = useState<Point | undefined>({
        lat: 52.2323778,
        lng: 20.9861998,
    });


    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps</div>;

    return (
        <div className="w-full">
            <RouteMap startingPoint={startingPoint} destinationPoint={destinationPoint}></RouteMap>
            <FoundMatches/>
            <SignOutButton/>
        </div>
    );
};

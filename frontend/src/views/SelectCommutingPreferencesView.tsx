import {useLoadScript} from '@react-google-maps/api';
import {TypographyH2} from '../components/TypographyH2.tsx';
import {TypographyH4} from '../components/TypographyH4.tsx';
import {Point} from '../hooks/useFindRoute.ts';
import {useState} from 'react';
import {updateAddressFrom, updateView} from '../store/appReducer.ts';
import {useAppDispatch} from '../store/store.ts';
import {ContinueButton} from '../components/ContinueButton.tsx';
import {TypographyH1} from '../components/TypographyH1.tsx';
import {BackButton} from '../components/BackButton.tsx';
import {Input} from "../components/Input.tsx";
import {AddressInput} from "../components/AddressInput.tsx";
import {RouteMap} from "../components/RouteMap.tsx";

export const SelectCommutingPreferencesView = () => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        id: '982eaad930f4790c',
        libraries: ['places'],
    });

    const [startingPoint, setStartingPoint] = useState<Point | undefined>(undefined);
    const [destinationPoint, setDestinationPoint] = useState<Point | undefined>(undefined);
    const [startingFromAddress, setStartingFromAddress] = useState<string>("");
    const [destinationAddress, setDestinationAddress] = useState<string>("");
    const dispatch = useAppDispatch();

    const options = {
        disableDefaultUI: true,
        gestureHandling: 'greedy',
        mapId: 'fbd0e4c5778bb4b3',
    };

    const center = {
        lat: 52.2318813,
        lng: 21.0324811,
    };

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps</div>;

    const onContinueClick = () => {
        dispatch(updateView('WHEN_YOU_ARE_GOING'));
    };

    return (
        <div className="flex-col max-h-full">
            <div style={{height: '50vh'}} className="p-8">
                <BackButton view="WELCOME"/>
                <TypographyH1 text={'Where are you commuting?'} className="font-medium text-xl"/>
                <TypographyH2 text={"Don't worry we will keep it private"} className="mb-4 font-extralight text-base"/>
                <div className="flex-col space-y-4 pt-16">
                    <TypographyH4 text={'I’m going from'}></TypographyH4>
                    <AddressInput handleAddressChanged={address => {
                        setStartingPoint(address.point)
                        dispatch(updateAddressFrom(address.point));
                        setStartingFromAddress(address.name)
                    }}>
                        <Input placeholder={"Start typing address..."} value={startingFromAddress}
                               onChange={setStartingFromAddress}></Input>
                    </AddressInput>
                    <TypographyH4 text={'To'}></TypographyH4>
                    <AddressInput handleAddressChanged={address => {
                        dispatch(updateAddressFrom(address.point));
                        setDestinationPoint(address.point)
                        setDestinationAddress(address.name)
                    }}>
                        <Input placeholder={"Add your work location..."}
                               value={destinationAddress}
                               onChange={setDestinationAddress}></Input>
                    </AddressInput>
                </div>
            </div>
            <div
                style={{
                    position: 'relative',
                    width: '100vw',
                    height: '65vh',
                }}
            >
                <RouteMap startingPoint={startingPoint} destinationPoint={destinationPoint}/>
            </div>
        </div>
    );
};

import {useLoadScript} from '@react-google-maps/api';
import {TypographyH4} from '../components/TypographyH4.tsx';
import {Point} from '../hooks/useFindRoute.ts';
import {useState} from 'react';
import {updateAddressFrom, updateAddressTo} from '../store/appReducer.ts';
import {useAppDispatch} from '../store/store.ts';
import {Input} from "../components/Input.tsx";
import {AddressInput} from "../components/AddressInput.tsx";
import {RouteMap} from '../components/RouteMap.tsx';

export const SelectCommutingPreferencesView = () => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        id: '982eaad930f4790c',
        libraries: ['places'],
    });

    const [startingPoint, setStartingPoint] = useState<Point | undefined>({
        lat: 52.249472,
        lng: 21.098527
    });
    const [destinationPoint, setDestinationPoint] = useState<Point | undefined>({
        lat: 52.2323778,
        lng: 20.9861998
    });
    const [startingFromAddress, setStartingFromAddress] = useState<string>("");
    const [destinationAddress, setDestinationAddress] = useState<string>("");
    const dispatch = useAppDispatch();

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps</div>;

    return (
        <div className="flex-col max-h-full">
            <div className="p-4 pt-32 pb-16 flex flex-col justify-center" style={{
                height: '40vh'
            }}>
                <div className="flex-col space-y-4 pt-16">
                    <TypographyH4 text={'I’m going from'}></TypographyH4>
                    <AddressInput handleAddressChanged={address => {
                        dispatch(updateAddressFrom(address.point));
                        setStartingPoint(address.point)
                        setStartingFromAddress(address.name)
                    }}>
                        <Input placeholder={"Start typing address..."} value={startingFromAddress}
                               onChange={setStartingFromAddress}></Input>
                    </AddressInput>
                    <TypographyH4 text={'To'}></TypographyH4>
                    <AddressInput handleAddressChanged={address => {
                        dispatch(updateAddressTo(address.point));
                        setDestinationPoint(address.point)
                        setDestinationAddress(address.name)
                    }}>
                        <Input placeholder={"Add your work location..."}
                               value={destinationAddress}
                               onChange={setDestinationAddress}></Input>
                    </AddressInput>
                </div>
            </div>
            <RouteMap startingPoint={startingPoint} destinationPoint={destinationPoint}/>
        </div>
    );
};

import {Autocomplete} from "@react-google-maps/api";
import {useState} from "react";
import {Point} from "../hooks/useFindRoute.ts";

export interface Address {
    point: Point;
    name: string;
}

export interface AddressInputProps {
    children: React.ReactElement,
    handleAddressChanged: (address: Address) => void;
}

export const AddressInput = ({children, handleAddressChanged}: AddressInputProps) => {

    const [addressAutocomplete, setAddressAutocomplete] = useState<any>(null);

    const handleAutocompleteChange = (autocomplete: any): Address | undefined => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            const location = place.geometry.location;
            return {
                point: {
                    lat: location.lat(),
                    lng: location.lng(),
                },
                name: place.name ?? place.formatted_address
            }
        } else {
            console.log('Autocomplete is not loaded yet!');
            return undefined;
        }
    };

    const addressChanged = () => {
        const address = handleAutocompleteChange(addressAutocomplete);
        if (address) {
            handleAddressChanged(address)
        }
    };

    return <Autocomplete onLoad={(e) => setAddressAutocomplete(e)} onPlaceChanged={addressChanged}>
        {children}
    </Autocomplete>
}

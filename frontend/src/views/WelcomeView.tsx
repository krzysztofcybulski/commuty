import {useEffect, useState} from 'react';
import {useAppDispatch} from '../store/store.ts';
import {RidePreference, updateRidePreferences} from '../store/appReducer.ts';

export const WelcomeView = () => {
    return (
        <div className="container mx-auto p-8 flex flex-col min-h-screen">
            <div className="flex-grow flex flex-col items-stretch justify-center">
                <div className="flex flex-col mb-4">
                    <Button ridePreference={RidePreference.DRIVER} text="I can take people in my car"/>
                    <Button ridePreference={RidePreference.PASSENGER} text="I would like to be a pasanger"/>
                </div>
            </div>
        </div>
    );
};

interface ButtonProps {
    text: string;
    ridePreference: RidePreference;
}

const Button = ({text, ridePreference}: ButtonProps) => {
    const dispatch = useAppDispatch();
    const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
    const handleClick = () => {
        setIsButtonClicked(!isButtonClicked);
        dispatch(
            updateRidePreferences({
                ridePreferencesFields: [ridePreference],
            }),
        );
    };

    useEffect(() => {
        dispatch(
            updateRidePreferences({
                [ridePreference]: isButtonClicked,
            }),
        );
    }, [isButtonClicked]);

    return (
        <div
            className={`text-lg bg-gray-800 text-white rounded-lg flex flex-col justify-center mb-4 h-22 ${isButtonClicked ? 'outline-none ring-2 ring-violet-600' : ''}`}
        >
            <button onClick={handleClick} className={`h-22 relative px-4 py-2 transition`}>
                <div className="flex justify-center my-1">{text}</div>
                <div className="flex justify-center">
                    <img
                        width="40px"
                        height="40px"
                        className={`${isButtonClicked ? '' : 'invisible'} bg-slate-400 rounded-full`}
                        src={'../../public/check-mark.png'}
                    />
                </div>
            </button>
        </div>
    );
};

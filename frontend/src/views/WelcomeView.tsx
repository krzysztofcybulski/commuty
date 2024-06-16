import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store/store.ts';
import { RidePreference, selectRidePreferences, updateRidePreferences } from '../store/appReducer.ts';
import { useSelector } from 'react-redux';

export const WelcomeView = () => {
  return (
    <div className="container mx-auto p-8 pl-4 pr-4 flex flex-col">
      <div className="flex-grow flex flex-col items-stretch justify-center">
        <div className="flex flex-col mb-4">
          <Button ridePreference={RidePreference.DRIVER} text="I can take people in my car" />
          <Button ridePreference={RidePreference.PASSENGER} text="I would like to be a pasanger" />
        </div>
      </div>
    </div>
  );
};

interface ButtonProps {
  text: string;
  ridePreference: RidePreference;
}

const Button = ({ text, ridePreference }: ButtonProps) => {
  const dispatch = useAppDispatch();
  const ridePreferences = useSelector(selectRidePreferences);
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(ridePreferences[ridePreference]);
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
      className={` text-2xl bg-gray-800 text-white rounded-xl flex flex-col justify-center mb-4 h-22 ${isButtonClicked ? 'outline-none ring-2 ring-black' : ''}`}
    >
      <button onClick={handleClick} className={` h-40 relative px-4 py-2 transition`}>
        <div className="flex justify-center my-1">{text}</div>
        <div className="flex justify-center">
          <img
            width="40px"
            height="40px"
            className={`${isButtonClicked ? '' : 'invisible'} bg-slate-400 rounded-full`}
            src={'/check-mark.png'}
          />
        </div>
      </button>
    </div>
  );
};

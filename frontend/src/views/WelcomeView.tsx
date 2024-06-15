import { TypographyH2 } from '../components/TypographyH2.tsx';
import { useCommutyApi } from '../client/useCommutyApi.ts';
import { useEffect, useState } from 'react';
import { CommutyApiRequest } from '../client/CommutyApiRequest.ts';
import { TypographyH4 } from '../components/TypographyH4.tsx';
import { ContinueButton } from '../components/ContinueButton.tsx';
import { useAppDispatch } from '../store/store.ts';
import { RidePreference, updatePayload, updateRidePreferences, updateView } from '../store/appReducer.ts';
import {TypographyH1} from "../components/TypographyH1.tsx";

export const exampleRequest: CommutyApiRequest = {
  user: {
    name: 'Piotrek',
    email: 'p.proszowski@gmail.com',
  },
  ridePreferences: ['DRIVER', 'PASSENGER'],
  commutingRoutes: [
    {
      addressFrom: {
        longitude: '52.2616832',
        latitude: '21.0501632',
        levelOfDetail: 13,
      },
      addressTo: {
        longitude: '52.2616832',
        latitude: '21.0501632',
        levelOfDetail: 13,
      },
      timePreferences: [
        {
          day: 'MONDAY',
          timeRange: {
            departureTime: '08:00',
            returnTime: '13:00',
          },
        },
      ],
    },
  ],
};

export const WelcomeView = () => {
  const { saveRoute } = useCommutyApi();
  const dispatch = useAppDispatch();

  useEffect(() => {
    saveRoute(exampleRequest);
  }, []);

  const onContinueClick = () => {
    dispatch(updateView('SELECT_COMMUTING_PREFERENCES'));
  };

  return (
      <div className="container mx-auto p-8 flex flex-col min-h-screen">
        <div className="flex flex-col items-start">
          <TypographyH1 text={'Hey! Tell us what are you looking for'} className="font-medium text-xl" />
          <TypographyH2 text={'It’s fine to select both'} className="mb-4 font-light text-base"/>
        </div>
        <div className="flex-grow flex flex-col items-stretch justify-center">
          <div className="flex flex-col mb-4">
            <Button text="I can take people in my car"/>
            <Button text="I would like to be a pasanger" className="mt-4"/>
          </div>
        </div>
        <div className="flex justify-end mt-auto">
          <ContinueButton onClick={onContinueClick}/>
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

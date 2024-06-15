import { TypographyH2 } from '../components/TypographyH2.tsx';
import { TypographyH3 } from '../components/TypographyH3.tsx';
import { useCommutyApi } from '../client/useCommutyApi.ts';
import { ReactNode, useEffect, useState } from 'react';
import { CommutyApiRequest } from '../client/CommutyApiRequest.ts';
import { TypographyH4 } from '../components/TypographyH4.tsx';

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

  useEffect(() => {
    saveRoute(exampleRequest);
  }, []);

  return (
    <div className="container mx-auto p-8">
      <TypographyH2 text={'Hey! Tell us what are you looking for'} />
      <TypographyH4 text={'It’s fine to select both'} />
      <Button text="I can take people in my car" />
      <Button text="I would like to be a pasanger" />
      <Button text={'Continue ->'} />
    </div>
  );
};

interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
  const handleClick = () => {
    setIsButtonClicked(!isButtonClicked);
    // send the state to localStorage
  };

  return (
    <button className="p-[2px] relative" onClick={handleClick}>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
      <div className="px-8 py-2 bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
        {text}
      </div>
    </button>
  );
};

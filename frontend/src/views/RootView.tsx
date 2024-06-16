import { WelcomeView } from './WelcomeView.tsx';
import { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useFetchUserData } from '../hooks/useFetchUserData.ts';
import { useAppDispatch, useAppSelector } from '../store/store.ts';
import {
  selectAddressFrom,
  selectAddressTo,
  selectChosenDays,
  selectDepartureTime,
  selectReturnTime,
  selectRidePreferences,
  selectUsername,
  selectView,
  updateView,
} from '../store/appReducer.ts';
import { SelectCommutingPreferencesView } from './SelectCommutingPreferencesView.tsx';
import { WhenYouAreGoingView } from './WhenYouAreGoingView.tsx';
import { OnboardingView, OnboardingViewConfig } from '../components/OnboardingView.tsx';
import { SetYourNameView } from './SetYourNameView.tsx';
import { CreateAccountView } from './CreateAccountView.tsx';
import { HomeView } from './HomeView.tsx';
import { useSelector } from 'react-redux';

export const RootView = () => {
  const [isWelcomeValid, setIsWelcomeValid] = useState(true);
  const [isCommutingValid, setIsCommutingValid] = useState(true);
  const [isWhenValid, setIsWhenValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);

  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const saveUserData = useFetchUserData();
  const view = useAppSelector(selectView);
  const ridePreferences = useSelector(selectRidePreferences);
  const chosenDays = useSelector(selectChosenDays);
  const addressTo = useSelector(selectAddressTo);
  const addressFrom = useSelector(selectAddressFrom);
  const returnTime = useSelector(selectReturnTime);
  const departureTime = useSelector(selectDepartureTime);
  const username = useSelector(selectUsername);

  const isWelcomeValidated = (): boolean => ridePreferences.DRIVER || ridePreferences.PASSENGER;
  const isCommutingPrefsValidated = (): boolean => !!addressFrom?.lat && !!addressTo?.lat;
  const isWhenYouAreGoingValidated = (): boolean => !!chosenDays?.length && !!departureTime && !!returnTime;
  const isUsernameValidated = (): boolean => !!username;

  const dispatch = useAppDispatch();

  useEffect(() => {
    saveUserData(user);
  }, []);

  const getView = () => {
    switch (view) {
      case 'WELCOME':
        return <WelcomeView />;
      case 'SELECT_COMMUTING_PREFERENCES':
        return <SelectCommutingPreferencesView />;
      case 'WHEN_YOU_ARE_GOING':
        return <WhenYouAreGoingView />;
      case 'SET_YOUR_NAME':
        return <SetYourNameView />;
      case 'CREATE_ACCOUNT':
        return <CreateAccountView />;
      case 'HOME_PAGE':
        return <HomeView />;
    }
  };

  const configBasedOnView = (): OnboardingViewConfig | undefined => {
    switch (view) {
      case 'WELCOME':
        return {
          onContinueClick: () => {
            if (isWelcomeValidated()) {
              setIsWelcomeValid(true);
              dispatch(updateView('SELECT_COMMUTING_PREFERENCES'));
            } else {
              setIsWelcomeValid(false);
            }
          },
          title: 'Hey! Tell us what are you looking for',
          subTitle: 'It’s fine to select both',
          hideBackButton: true,
          isFieldValidated: isWelcomeValid || isWelcomeValidated(),
          errorMessage: 'You must choose at least one option.',
        };
      case 'SELECT_COMMUTING_PREFERENCES':
        return {
          onContinueClick: () => {
            if (isCommutingPrefsValidated()) {
              setIsCommutingValid(true);
              dispatch(updateView('WHEN_YOU_ARE_GOING'));
            } else {
              setIsCommutingValid(false);
            }
          },
          title: 'Where are you going?',
          subTitle: "Don't worry, we will keep it private ;)",
          isFieldValidated: isCommutingValid || isCommutingPrefsValidated(),
          errorMessage: 'You must fill all the fields above.',
        };
      case 'WHEN_YOU_ARE_GOING':
        return {
          onContinueClick: () => {
            if (isWhenYouAreGoingValidated()) {
              setIsWhenValid(true);
              dispatch(updateView('SET_YOUR_NAME'));
            } else {
              setIsWhenValid(false);
            }
          },
          title: 'When are you commuting?',
          subTitle: 'We will find a perfect match for You',
          view: 'SELECT_COMMUTING_PREFERENCES',
          isFieldValidated: isWhenValid || isWhenYouAreGoingValidated(),
          errorMessage: 'You must choose on which days You want to ride, and at what times.',
        };
      case 'SET_YOUR_NAME':
        return {
          onContinueClick: () => {
            if (isUsernameValidated()) {
              setIsUsernameValid(true);
              dispatch(updateView('CREATE_ACCOUNT'));
            } else setIsUsernameValid(false);
          },
          view: 'WHEN_YOU_ARE_GOING',
          isFieldValidated: isUsernameValid || isUsernameValidated(),
          errorMessage: 'You must choose the username.',
        };
      case 'CREATE_ACCOUNT':
        return {
          onContinueClick: () => {},
          buttonDisabled: true,
          view: 'SET_YOUR_NAME',
        };
      default:
        return undefined;
    }
  };

  const isOnboardingView = () =>
    ['WELCOME', 'SELECT_COMMUTING_PREFERENCES', 'WHEN_YOU_ARE_GOING', 'SET_YOUR_NAME', 'CREATE_ACCOUNT'].includes(view);

  if (!isSignedIn && !isOnboardingView()) {
    dispatch(updateView('WELCOME'));
  }

  return (
    <div className="flex justify-stretch items-stretch w-full">
      {['WELCOME', 'SELECT_COMMUTING_PREFERENCES', 'WHEN_YOU_ARE_GOING', 'SET_YOUR_NAME', 'CREATE_ACCOUNT'].includes(
        view,
      ) ? (
        <OnboardingView config={configBasedOnView()!}>{getView()}</OnboardingView>
      ) : (
        getView()
      )}
    </div>
  );
};

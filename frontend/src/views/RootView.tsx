import {WelcomeView} from './WelcomeView.tsx';
import {useEffect} from 'react';
import {useUser} from '@clerk/clerk-react';
import {useSaveUserData} from '../hooks/useSaveUserData.ts';
import {useAppDispatch, useAppSelector} from '../store/store.ts';
import {selectView, updateView} from '../store/appReducer.ts';
import {SelectCommutingPreferencesView} from './SelectCommutingPreferencesView.tsx';
import {WhenYouAreGoingView} from "./WhenYouAreGoingView.tsx";
import {OnboardingView, OnboardingViewConfig} from "../components/OnboardingView.tsx";
import {SetYourNameView} from './SetYourNameView.tsx';
import {CreateAccountView} from "./CreateAccountView.tsx";
import {HomeView} from "./HomeView.tsx";

export const RootView = () => {
    const {user} = useUser();
    const saveUserData = useSaveUserData();
    const view = useAppSelector(selectView);
    const dispatch = useAppDispatch();

    useEffect(() => {
        saveUserData(user);
    }, []);

    const getView = () => {
        switch (view) {
            case 'WELCOME':
                return <WelcomeView></WelcomeView>;
            case 'SELECT_COMMUTING_PREFERENCES':
                return <SelectCommutingPreferencesView></SelectCommutingPreferencesView>;
            case 'WHEN_YOU_ARE_GOING':
                return <WhenYouAreGoingView></WhenYouAreGoingView>;
            case 'SET_YOUR_NAME':
                return <SetYourNameView></SetYourNameView>;
            case 'CREATE_ACCOUNT':
                return <CreateAccountView></CreateAccountView>;
            case 'HOME_PAGE':
                return <HomeView></HomeView>;
        }
    };

    const configBasedOnView = (): OnboardingViewConfig | undefined => {
        switch (view) {
            case 'WELCOME':
                return {
                    onContinueClick: () => {
                        dispatch(updateView('SELECT_COMMUTING_PREFERENCES'))
                    },
                    title: 'Hey! Tell us what are you looking for',
                    subTitle: 'It’s fine to select both',
                    hideBackButton: true
                }
            case 'SELECT_COMMUTING_PREFERENCES':
                return {
                    onContinueClick: () => {
                        dispatch(updateView('WHEN_YOU_ARE_GOING'))
                    },
                    title: 'When are you going?',
                    subTitle: 'It’s fine to select both'
                }
            case 'WHEN_YOU_ARE_GOING':
                return {
                    onContinueClick: () => {
                        dispatch(updateView('SET_YOUR_NAME'))
                    },
                    title: 'Where are you commuting?',
                    subTitle: 'It’s fine to select both'
                }
            case 'SET_YOUR_NAME':
                return {
                    onContinueClick: () => {
                        dispatch(updateView('CREATE_ACCOUNT'))
                    }
                }
            case 'CREATE_ACCOUNT':
                return {
                    onContinueClick: () => {
                    },
                    buttonDisabled: true
                }
            default:
                return undefined;
        }
    }

    return <div className="flex justify-stretch items-stretch w-full">
        {
            ['WELCOME', 'SELECT_COMMUTING_PREFERENCES', 'WHEN_YOU_ARE_GOING', 'SET_YOUR_NAME', 'CREATE_ACCOUNT'].includes(view)
                ? (
                    <OnboardingView config={configBasedOnView()!}>
                        {getView()}
                    </OnboardingView>
                ) : (
                    getView()
                )
        }
    </div>
};


import {WelcomeView} from './WelcomeView.tsx';
import {useEffect} from 'react';
import {SignIn, useAuth, useUser} from '@clerk/clerk-react';
import {useSaveUserData} from '../hooks/useSaveUserData.ts';
import {useAppSelector} from '../store/store.ts';
import {selectView} from '../store/appReducer.ts';
import {SelectCommutingPreferencesView} from "./SelectCommutingPreferencesView.tsx";

export const RootView = () => {
    const {user} = useUser();
    const {getToken} = useAuth();
    const saveUserData = useSaveUserData();
    const view = useAppSelector(selectView);

    useEffect(() => {
        saveUserData(user);
        getToken().then(result => console.log(result))
    }, []);

    const getView = () => {
        switch (view) {
            case 'WELCOME':
                return <WelcomeView></WelcomeView>;
            case 'SELECT_COMMUTING_PREFERENCES':
                return <SelectCommutingPreferencesView></SelectCommutingPreferencesView>;
            default:
                return '';
        }
    };

    return <div className="max-w-max">
        {
            !user && <SignIn></SignIn>
        }

        {getView()}
    </div>;
};

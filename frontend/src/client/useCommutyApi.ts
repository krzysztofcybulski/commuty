import {CommutyApiRequest} from './CommutyApiRequest.ts';

export const useCommutyApi = () => {
    const BASE_URL = import.meta.env.VITE_COMMUTY_API_URL;

    const saveRoute = async (request: CommutyApiRequest, token: string, onSuccess: () => void) => {

        return fetch(`${BASE_URL}/routes`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(request),
        }).then(async (result) => {
            if (result.status === 201) {
                onSuccess()
            }
        });
    };

    const findMatchedRoutes = async (token: string, onSuccess: (json: any) => void) => {

        return fetch(`${BASE_URL}/routes`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }).then(async (result) => {
            if (result.status === 200) {
                onSuccess(await result.json())
            }
        });
    };


    const getPreferences = async (token: string, onSuccess: (json: any) => void) => {

        return fetch(`${BASE_URL}/routes/preferences`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }).then(async (result) => {
            if (result.status === 200) {
                onSuccess(await result.json())
            }
        });
    };

    return {
        saveRoute: saveRoute,
        findMatchedRoutes: findMatchedRoutes,
        getPreferences: getPreferences
    };
};

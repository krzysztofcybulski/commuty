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

    return {
        saveRoute: saveRoute,
    };
};

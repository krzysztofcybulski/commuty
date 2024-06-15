import { CommutyApiRequest } from './CommutyApiRequest.ts';

export const useCommutyApi = () => {
  const BASE_URL = import.meta.env.VITE_COMMUTY_API_URL;

  const saveRoute = async (request: CommutyApiRequest) => {
    return fetch(`${BASE_URL}/routes`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    }).then(async (result) => {
      console.log(result);
    });
  };

  return {
    saveRoute: saveRoute,
  };
};

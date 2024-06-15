export const useCommutyApi = () => {

    const BASE_URL = import.meta.env.VITE_COMMUTY_API_URL;

    const saveRoute = async () => {
        return fetch(`${BASE_URL}/routes`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(async result => {
                console.log(result)
            })
    }

    return {
        saveRoute: saveRoute,
    }
}

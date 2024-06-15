
export interface FindRoutesProps {
    setDirections: (directions: any) => void;
}

export interface Point {
    lat: number;
    lng: number;
}

export const useFindRoute = ({setDirections}: FindRoutesProps) => {
    return (pointA: Point, pointB: Point) => {
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
            {
                origin: pointA,
                destination: pointB,
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setDirections(result);
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    }
}

import {Button} from "../components/Button.tsx";
import {TypographyH2} from "../components/TypographyH2.tsx";
import {TypographyH3} from "../components/TypographyH3.tsx";
import {useCommutyApi} from "../client/useCommutyApi.ts";
import {useEffect} from "react";
import {CommutyApiRequest} from "../client/CommutyApiRequest.ts";

export const exampleRequest: CommutyApiRequest = {
    "user": {
        "name": "Piotrek",
        "email": "p.proszowski@gmail.com"
    },
    "ridePreferences": [
        "DRIVER",
        "PASSENGER"
    ],
    "commutingRoutes": [
        {
            "addressFrom": {
                "longitude": "52.2616832",
                "latitude": "21.0501632",
                "levelOfDetail": 13
            },
            "addressTo": {
                "longitude": "52.2616832",
                "latitude": "21.0501632",
                "levelOfDetail": 13
            },
            "timePreferences": [
                {
                    "day": "MONDAY",
                    "timeRange": {
                        "departureTime": "8:00",
                        "returnTime": "13:00"
                    }
                }
            ]
        }
    ]
}


export const WelcomeView = () => {

    const {saveRoute} = useCommutyApi()

    useEffect(() => {
        saveRoute(exampleRequest)
    }, []);

    return <div className="container mx-auto p-8">
        <TypographyH2 text={"Hey! Tell us what are you looking for"}/>
        <TypographyH3 text={"It’s fine to select both"}/>
        <div>
            <p>I can take people in my car</p>
        </div>
        <div>
            <p>I would like to be a passenger</p>
        </div>
        <Button text={"Continue ->"}/>
    </div>
}

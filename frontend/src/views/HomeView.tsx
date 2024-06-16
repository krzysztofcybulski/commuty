import {FoundMatches} from '../components/FoundMatches.tsx';
import {useAuth, useUser} from '@clerk/clerk-react';
import {RouteMap} from "../components/RouteMap.tsx";
import {useEffect, useState} from "react";
import {Point} from "../hooks/useFindRoute.ts";
import {useLoadScript} from "@react-google-maps/api";
import {TypographyH4} from "../components/TypographyH4.tsx";
import {useCommutyApi} from "../client/useCommutyApi.ts";
import {WeekDaysDisplayWithCommuteTime} from "../components/WeekDaysDisplayWithCommuteTime.tsx";
import {CommuteProps} from "../components/MatchRow.tsx";
import {BottomMenu} from "../components/BottomMenu.tsx";
import {FullDayName} from "../store/appReducer.ts";
import {Dropdown} from "../components/Dropdown.tsx";
import {Menu, MenuItem} from "../components/Menu.tsx";

interface Route {
    days: FullDayName[];
    from: string;
    to: string;
}

interface CommutingInfo {
    routes: Route[]
}

export const HomeView = () => {

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        id: '982eaad930f4790c',
        libraries: ['places'],
    });

    const [token, setToken] = useState<string | null>()
    const {getPreferences} = useCommutyApi()
    const user = useUser()
    const {getToken} = useAuth()
    const [commutingInfo, setCommutingInfo] = useState<CommutingInfo>()

    useEffect(() => {
        getToken({
            template: '60k'
        }).then((result) => setToken(result))
    }, []);

    useEffect(() => {
        if (token) {
            getPreferences(token, (json) => {
                setCommutingInfo(json.commutingInfo)
            })
        }

    }, [token]);

    const [startingPoint] = useState<Point | undefined>({
        lat: 52.249472,
        lng: 21.098527,
    });
    const [destinationPoint] = useState<Point | undefined>({
        lat: 52.2323778,
        lng: 20.9861998,
    });

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps</div>;

    const toCommuteProps = (route: Route): CommuteProps => {
        return {
            from: route.from.substring(0, 5),
            to: route.to.substring(0, 5),
            isTimeFitting: true
        }
    }

    console.log(commutingInfo)
    return (
        <div className="flex">
            <div>
                <TypographyH4 className={"fixed z-10 top-4 pl-2"} text={"Hey, " + user?.user?.fullName ?? ''}/>
                {commutingInfo && <WeekDaysDisplayWithCommuteTime
                    className={"fixed z-10 top-4 pt-10 pl-2"}
                    chosenWeekDays={commutingInfo.routes[0].days.map(e => ({chosenWeekDay: e, isChosen: true}))}
                    commute={toCommuteProps(commutingInfo.routes[0])}></WeekDaysDisplayWithCommuteTime>}
            </div>
            <RouteMap startingPoint={startingPoint} destinationPoint={destinationPoint} height={'55vh'}></RouteMap>
            <FoundMatches className={"rounded-full fixed top-1/2 w-full"}/>
            <BottomMenu chosen={'HOME'}/>
        </div>
    );
};

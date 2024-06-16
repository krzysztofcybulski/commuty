import {useCommutyApi} from "../client/useCommutyApi.ts";
import {useEffect, useState} from "react";
import {useAuth} from "@clerk/clerk-react";
import {json} from "react-router-dom";

interface Route {
    day: string;
    from: string;
    to: string;
}

interface CommutingInfo {
    routes: Route[]
}

interface Match {
    commutingInfo: CommutingInfo
}

interface Matches {
    matches: Match[]
}

export const FoundMatches = () => {
    const {findMatchedRoutes} = useCommutyApi()
    const [token, setToken] = useState<string | null>()
    const {getToken} = useAuth()
    const [matches, setMatches] = useState<Matches>()

    useEffect(() => {
        getToken({
            template: '60k'
        }).then((result) => setToken(result))
    }, []);

    useEffect(() => {
        if (token) {
            findMatchedRoutes(token!, (json) => {
                setMatches(json)
                console.log(json)
            })
        }

        console.log(matches)
    }, [token]);

    return <div>
    </div>
}

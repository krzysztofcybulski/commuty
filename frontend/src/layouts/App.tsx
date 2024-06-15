import {Outlet} from "react-router-dom";
import {useUser} from "@clerk/clerk-react";
import {useEffect} from "react";
import {useSaveUserData} from "../hooks/useSaveUserData.ts";

export const App = () => {

    const {user} = useUser()
    const saveUserData = useSaveUserData()

    useEffect(() => {
        saveUserData(user)
    }, []);

    return <main>
        <Outlet/>
    </main>
}

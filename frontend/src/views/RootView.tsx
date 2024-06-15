import {WelcomeView} from "./WelcomeView.tsx";
import {useEffect} from "react";
import {useUser} from "@clerk/clerk-react";
import {useSaveUserData} from "../hooks/useSaveUserData.ts";
import {useAppSelector} from "../store/store.ts";
import {selectView} from "../store/appReducer.ts";

export const RootView = () => {

    const {user} = useUser()
    const saveUserData = useSaveUserData()
    const view = useAppSelector(selectView)

    useEffect(() => {
        saveUserData(user)
    }, []);

    switch (view) {
        case "WELCOME":
            return <WelcomeView></WelcomeView>
        default:
            return ""
    }
}

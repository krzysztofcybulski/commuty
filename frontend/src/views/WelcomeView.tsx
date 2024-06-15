import {Button} from "../components/Button.tsx";
import {TypographyH2} from "../components/TypographyH2.tsx";
import {TypographyH3} from "../components/TypographyH3.tsx";
import {useCommutyApi} from "../client/useCommutyApi.ts";
import {useEffect} from "react";

export const WelcomeView = () => {

    const {saveRoute} = useCommutyApi()

    useEffect(() => {
        saveRoute()
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

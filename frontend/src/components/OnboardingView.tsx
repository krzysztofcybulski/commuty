import {ContinueButton} from "./ContinueButton.tsx";
import {TypographyH1} from "./TypographyH1.tsx";
import React from "react";
import {TypographyH2} from "./TypographyH2.tsx";
import {BackButton} from "./BackButton.tsx";
import {useSelector} from "react-redux";
import {selectPayload} from "../store/appReducer.ts";
import {useUser} from "@clerk/clerk-react";
import {useCommutyApi} from "../client/useCommutyApi.ts";

export interface ViewConfig {
    onContinueClick: () => void;
    title?: string;
    subTitle?: string;
    buttonDisabled?: boolean;
}

export interface OnboardingViewProps {
    children: React.ReactNode;
    config: ViewConfig
}

export const OnboardingView = ({children, config}: OnboardingViewProps) => {

    const {user} = useUser()
    const {saveRoute} = useCommutyApi()

    const payload = useSelector(selectPayload)

    if (user) {
        saveRoute(
            {
                ...payload,
                user: {
                    ...payload.user,
                    email: user.emailAddresses[0].emailAddress
                }
            }
        )
    }

    return <div className="w-full">
        <div className="flex flex-col items-stretch justify-stretch w-full top-0 p-4">
            <BackButton view="WELCOME"/>
            <TypographyH1 text={config.title || ""} className="font-medium text-xl"/>
            <TypographyH2 text={config.subTitle || ""} className="mt-2 font-light text-base"/>
        </div>
        {children}
        <div className="fixed flex items-stretch justify-stretch w-full bottom-0">
            {!config.buttonDisabled && <ContinueButton className="grow m-4" onClick={config.onContinueClick}/>}
        </div>
    </div>
}

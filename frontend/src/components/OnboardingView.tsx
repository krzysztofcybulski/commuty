import {ContinueButton} from "./ContinueButton.tsx";
import {TypographyH1} from "./TypographyH1.tsx";
import React, {useEffect, useState} from "react";
import {TypographyH2} from "./TypographyH2.tsx";
import {BackButton} from "./BackButton.tsx";
import {useSelector} from "react-redux";
import {selectPayload, updateView} from "../store/appReducer.ts";
import {useAuth, useUser} from "@clerk/clerk-react";
import {useCommutyApi} from "../client/useCommutyApi.ts";
import {useAppDispatch} from "../store/store.ts";

export interface OnboardingViewConfig {
    onContinueClick: () => void;
    title?: string;
    subTitle?: string;
    buttonDisabled?: boolean;
    hideBackButton?: boolean;
}

export interface OnboardingViewProps {
    children: React.ReactNode;
    config: OnboardingViewConfig
}

export const OnboardingView = ({children, config}: OnboardingViewProps) => {

    const {user} = useUser()
    const {getToken} = useAuth()
    const {saveRoute} = useCommutyApi()
    const [token, setToken] = useState<string | null>(null)
    const dispatch = useAppDispatch()

    const payload = useSelector(selectPayload)

    const onSuccess = () => {
        dispatch(updateView('HOME_PAGE'))
    }

    useEffect(() => {
        if(user) {
            getToken({
                template: '60k'
            }).then((result) => setToken(result))
        }

    }, [user]);

    useEffect(() => {
        if (user && token) {
            saveRoute(
                {
                    ...payload,
                    user: {
                        ...payload.user,
                        email: user.emailAddresses[0].emailAddress
                    }
                },
                token!,
                onSuccess
            )
        }

    }, [user, token]);

    return <div className="w-full">
        <div className="flex flex-col items-stretch justify-stretch w-full top-0 p-4">
            { !config.hideBackButton && <BackButton view="WELCOME"/> }
            <TypographyH1 text={config.title || ""} className="font-medium text-xl"/>
            <TypographyH2 text={config.subTitle || ""} className="mt-2 font-light text-base"/>
        </div>
        {children}
        <div className="fixed flex items-stretch justify-stretch w-full bottom-0">
            {!config.buttonDisabled && <ContinueButton className="grow m-4" onClick={config.onContinueClick}/>}
        </div>
    </div>
}

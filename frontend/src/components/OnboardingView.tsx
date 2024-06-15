import {ContinueButton} from "./ContinueButton.tsx";
import {TypographyH1} from "./TypographyH1.tsx";
import React from "react";
import {TypographyH2} from "./TypographyH2.tsx";
import {BackButton} from "./BackButton.tsx";

export interface ViewConfig {
    onContinueClick: () => void;
    title?: string;
    subTitle?: string;
}

export interface OnboardingViewProps {
    children: React.ReactNode;
    config: ViewConfig
}

export const OnboardingView = ({children, config}: OnboardingViewProps) => {
    return <div className="w-full">
        <div className="fixed flex flex-col items-stretch justify-stretch w-full top-0 p-4">
            <BackButton view="WELCOME"/>
            <TypographyH1 text={config.title || ""} className="font-medium text-xl"/>
            <TypographyH2 text={config.subTitle || ""} className="mt-2 font-light text-base"/>
        </div>
        {children}
        <div className="fixed flex items-stretch justify-stretch w-full bottom-0">
            <ContinueButton className="grow m-4" onClick={config.onContinueClick}/>
        </div>
    </div>
}

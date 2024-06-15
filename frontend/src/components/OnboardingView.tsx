import {ContinueButton} from "./ContinueButton.tsx";

export interface ViewConfig {
    onContinueClick: () => void;
}

export interface OnboardingViewProps {
    children: React.ReactNode;
    config: ViewConfig
}

export const OnboardingView = ({children, config}: OnboardingViewProps) => {
    return <>
        {children}
        <div className="fixed flex items-stretch justify-stretch w-full bottom-0">
            <ContinueButton className="grow m-4" onClick={config.onContinueClick}/>
        </div>
    </>
}

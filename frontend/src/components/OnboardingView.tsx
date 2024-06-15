import {ContinueButton} from "./ContinueButton.tsx";

export interface ViewConfig {
    onContinueClick: () => void;
}

export interface OnboardingViewProps {
    children: React.ReactNode;
    config: ViewConfig
}

export const OnboardingView = ({children, config}: OnboardingViewProps) => {
    return <div>
        {children}
        <div className="flex fixed w-full bottom-4">
            <ContinueButton className="mx-auto w-96" onClick={config.onContinueClick}/>
        </div>
    </div>
}

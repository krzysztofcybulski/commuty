import {ReactNode} from 'react';
import {TypographyH4} from "./TypographyH4.tsx";

interface LabelProps {
    title: string;
    children?: ReactNode;
    className?: string
}

export const Label = ({title, children, className}: LabelProps) => {
    return (
        <div>
            <TypographyH4 className={className} text={title}></TypographyH4>
            {children}
        </div>
    );
};

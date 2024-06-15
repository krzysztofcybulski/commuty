interface TypographyH1Props {
    text: string;
}

export const TypographyH1 = ({text}: TypographyH1Props) => (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {text}
    </h1>
);

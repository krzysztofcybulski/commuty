interface TypographyH1Props {
  text: string;
  className?: string;
}

export const TypographyH1 = ({ text, className }: TypographyH1Props) => (
  <h1 className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}>{text}</h1>
);

interface TypographyH4Props {
  text: string;
  className?: string;
}

export const TypographyH4 = ({ text, className }: TypographyH4Props) => {
  return <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}>{text}</h4>;
};

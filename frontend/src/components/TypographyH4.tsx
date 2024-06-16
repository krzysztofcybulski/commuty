interface TypographyH4Props {
  text: string;
  className?: string;
  onClick?: () => void;
}

export const TypographyH4 = ({ text, className, onClick }: TypographyH4Props) => {
  return <h4 onClick={onClick} className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}>{text}</h4>;
};

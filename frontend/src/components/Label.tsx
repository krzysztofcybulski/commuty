import { ReactNode } from 'react';

interface LabelProps {
  title: string;
  htmlFor?: string;
  children?: ReactNode;
}

export const Label = ({ title, htmlFor, children }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} title={title}>
      {children}
    </label>
  );
};

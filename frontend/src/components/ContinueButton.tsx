interface ButtonProps {
  onClick: () => void;
  text?: string;
}

export const ContinueButton = ({ onClick, text = 'Continue ➡️' }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex h-14 min-w-full rounded-lg bg-gray-800 text-white justify-center items-center text-xl"
    >
      <p>{text}</p>
    </button>
  );
};

interface CommuteTimeProps {
  from: string;
  to: string;
  isTimeFitting: boolean;
}

export const CommuteTime = ({ from, to, isTimeFitting }: CommuteTimeProps) => {
  return (
    <div
      className={`text-lg text-white flex flex-row justify-center items-center gap-2 rounded-full h-10 ${isTimeFitting ? 'bg-gray-800' : 'bg-slate-400'}`}
    >
      {from}
      <img width="16px" height="16px" src="../../public/arrow-right.png" />
      {to}
    </div>
  );
};

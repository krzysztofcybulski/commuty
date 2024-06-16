interface CommuteTimeProps {
  from: string;
  to: string;
  isTimeFitting: boolean;
}

export const CommuteTime = ({ from, to, isTimeFitting }: CommuteTimeProps) => {
  return (
    <div
      className={`p-2 text-sm text-white flex flex-row justify-center items-center gap-1 rounded-full h-10 ${isTimeFitting ? 'bg-gray-800' : 'bg-slate-400'}`}
    >
      {from}
      <img width="16px" height="16px" src="/public/arrow-right.png" />
      {to}
    </div>
  );
};

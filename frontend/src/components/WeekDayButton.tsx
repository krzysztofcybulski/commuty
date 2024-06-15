import { useEffect, useState } from 'react';

type FullDayName = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

interface WeekDay {
  short: 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su';
  fullDayName: FullDayName;
}

interface WeekDaysInputProps {
  weekDay: WeekDay;
  handleWeekDayClick: (fullDayName: FullDayName, isDayPicked: boolean) => void;
}

export const WeekDayButton = ({ weekDay, handleWeekDayClick }: WeekDaysInputProps) => {
  const [isDayPicked, setIsDayPicked] = useState<boolean>(false);

  const handleDayPick = () => {
    setIsDayPicked(!isDayPicked);
  };

  useEffect(() => {
    handleWeekDayClick(weekDay.fullDayName, isDayPicked);
  }, [isDayPicked]);

  return (
    <div
      className={`rounded-full w-6 h-6 flex flex-row items-center justify-center text-white text-xs ${isDayPicked ? 'bg-slate-400' : 'bg-gray-800'}`}
    >
      <button onClick={handleDayPick}>{weekDay.short}</button>
    </div>
  );
};
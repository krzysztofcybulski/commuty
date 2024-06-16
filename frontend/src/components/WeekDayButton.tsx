import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWeeksDayChosen } from '../store/appReducer';

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
  const chosenWeekDays = useSelector(selectWeeksDayChosen);
  const [isDayPicked, setIsDayPicked] = useState<boolean>(
    chosenWeekDays && chosenWeekDays[weekDay.fullDayName] ? chosenWeekDays[weekDay.fullDayName] : false,
  );

  const handleDayPick = () => {
    setIsDayPicked(!isDayPicked);
  };

  useEffect(() => {
    handleWeekDayClick(weekDay.fullDayName, isDayPicked);
  }, [isDayPicked]);

  return (
    <div
      className={`rounded-full w-10 h-10 flex flex-row items-center justify-center text-white text-xs ${isDayPicked ? 'bg-gray-800' : 'bg-slate-400'}`}
    >
      <button onClick={handleDayPick}>{weekDay.short}</button>
    </div>
  );
};

import { useEffect, useState } from 'react';
import { WeekDayButton } from './WeekDayButton';
import { useSelector } from 'react-redux';
import { selectChosenDays, selectWeeksDayChosen, updateWeeksDayChosen } from '../store/appReducer';
import { useAppDispatch } from '../store/store';

type FullDayName = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

interface WeekDay {
  short: 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su';
  fullDayName: FullDayName;
}

const weekDays: WeekDay[] = [
  { short: 'Mo', fullDayName: 'MONDAY' },
  { short: 'Tu', fullDayName: 'TUESDAY' },
  { short: 'We', fullDayName: 'WEDNESDAY' },
  { short: 'Th', fullDayName: 'THURSDAY' },
  { short: 'Fr', fullDayName: 'FRIDAY' },
  { short: 'Sa', fullDayName: 'SATURDAY' },
  { short: 'Su', fullDayName: 'SUNDAY' },
];

interface WeekDaysInput {
  handleWeekDaysChange: (weekDaysState: Record<FullDayName, boolean>) => void;
}

export const WeekDaysInput = ({ handleWeekDaysChange }: WeekDaysInput) => {
  const dispatch = useAppDispatch();
  const chosenWeekDays = useSelector(selectWeeksDayChosen);
  console.log(chosenWeekDays);
  const [weekDaysState, setWeekDaysState] = useState<Record<FullDayName, boolean>>(
    chosenWeekDays || {
      MONDAY: false,
      TUESDAY: false,
      WEDNESDAY: false,
      THURSDAY: false,
      FRIDAY: false,
      SATURDAY: false,
      SUNDAY: false,
    },
  );

  useEffect(() => {
    handleWeekDaysChange(weekDaysState);
  }, [weekDaysState]);

  const handleWeekDayClick = (weekDay: FullDayName, isDayPicked: boolean) => {
    setWeekDaysState({
      ...weekDaysState,
      [weekDay]: isDayPicked,
    });
    dispatch(updateWeeksDayChosen({ ...weekDaysState, [weekDay]: isDayPicked }));
  };

  return (
    <div className="flex flex-row gap-1 mt-2 mb-2">
      {weekDays.map((weekDay) => {
        return <WeekDayButton handleWeekDayClick={handleWeekDayClick} weekDay={weekDay} />;
      })}
    </div>
  );
};

import { useState } from 'react';
import { WeekDayButton } from './WeekDayButton';

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

export const WeekDaysInput = () => {
  const [weekDaysState, setWeekDaysState] = useState<Record<FullDayName, boolean>>({
    MONDAY: false,
    TUESDAY: false,
    WEDNESDAY: false,
    THURSDAY: false,
    FRIDAY: false,
    SATURDAY: false,
    SUNDAY: false,
  });

  const handleWeekDayClick = (weekDay: FullDayName, isDayPicked: boolean) => {
    setWeekDaysState({
      ...weekDaysState,
      [weekDay]: isDayPicked,
    });
  };

  console.log(weekDaysState);

  return (
    <div className="flex flex-row gap-1">
      {weekDays.map((weekDay) => {
        return <WeekDayButton handleWeekDayClick={handleWeekDayClick} weekDay={weekDay} />;
      })}
    </div>
  );
};

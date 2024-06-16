type FullDayName = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export interface ChosenWeekDay {
  chosenWeekDay: FullDayName;
  isChosen: boolean;
}

interface WeekDaysDisplayProps {
  chosenWeekDays: ChosenWeekDay[];
  className?: string;
}

enum WeekDayFullNameToShortName {
  'MONDAY' = 'Mo',
  'TUESDAY' = 'Tu',
  'WEDNESDAY' = 'We',
  'THURSDAY' = 'Th',
  'FRIDAY' = 'Fr',
  'SATURDAY' = 'Sa',
  'SUNDAY' = 'Su',
}

export const WeekDaysDisplay = ({ chosenWeekDays, className }: WeekDaysDisplayProps) => {
  return (
    <div className={`grid grid-cols-4 flex-row gap-1 ${className}`}>
      {chosenWeekDays.map((chosenWeekDay, index) => {
        return (
          <div
            className={`rounded-full w-8 h-8 flex flex-row items-center justify-center text-white text-xs ${chosenWeekDay.isChosen && chosenWeekDay.chosenWeekDay !== "FRIDAY" ? 'bg-gray-800' : 'bg-slate-400'}`}
            key={index}
          >
            {WeekDayFullNameToShortName[chosenWeekDay.chosenWeekDay]}
          </div>
        );
      })}
    </div>
  );
};

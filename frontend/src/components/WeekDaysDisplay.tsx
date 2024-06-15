type FullDayName = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

interface ChosenWeekDay {
  chosenWeekDay: FullDayName;
  isChosen: boolean;
}

interface WeekDaysDisplayProps {
  chosenWeekDays: ChosenWeekDay[];
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

export const WeekDaysDisplay = ({ chosenWeekDays }: WeekDaysDisplayProps) => {
  return (
    <div>
      {chosenWeekDays.map((chosenWeekDay, index) => {
        return (
          <div
            className={`rounded-full w-6 h-6 flex flex-row items-center justify-center text-white text-xs ${chosenWeekDay.isChosen ? 'bg-slate-400' : 'bg-gray-800'}`}
            key={index}
          >
            {WeekDayFullNameToShortName[chosenWeekDay.chosenWeekDay]}
          </div>
        );
      })}
    </div>
  );
};

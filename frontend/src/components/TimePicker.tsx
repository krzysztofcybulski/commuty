interface TimePickerProps {
  setTimePickerTime: (time: string) => void;
  defaultValue?: string;
  className?: string;
}

export const TimePicker = ({ setTimePickerTime, defaultValue, className }: TimePickerProps) => {
  const generateTimeOptions = () => {
    const times = [];
    for (let i = 7; i < 18; i++) {
      times.push(`${String(i).padStart(2, '0')}:00`);
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  return (
    <div className={`flex flex-col items-start space-y-2 mt-2 mb-2 ${className}`}>
      <select
        defaultValue={defaultValue}
        id="time-picker"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ring-black"
        onChange={(e) => setTimePickerTime(e.target.value)}
      >
        <option value="" disabled>
          Select time
        </option>
        {timeOptions.map((timeOption, index) => (
          <option key={index} value={timeOption}>
            {timeOption}
          </option>
        ))}
      </select>
    </div>
  );
};

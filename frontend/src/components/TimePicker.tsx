interface TimePickerProps {
  setTimePickerTime: (time: string) => void;
}

export const TimePicker = ({ setTimePickerTime }: TimePickerProps) => {
  const generateTimeOptions = () => {
    const times = [];
    for (let i = 7; i < 18; i++) {
      times.push(`${String(i).padStart(2, '0')}:00`);
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  return (
    <div className="flex flex-col items-start space-y-2">
      <select
        id="time-picker"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ring-violet-600"
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

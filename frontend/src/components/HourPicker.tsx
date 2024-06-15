import 'rc-time-picker/assets/index.css';

import moment from 'moment';
import TimePicker from 'rc-time-picker';
import {Moment} from "moment/moment";
import styled from "styled-components";

interface HourPickerProps {
  onChange?: (newValue: Moment) => void;
  value?: Moment;
}

const StyledTimePicker = styled(TimePicker)`
    & .rc-time-picker-panel-select-option-selected {
        background-color: #edeffe;
        font-weight: normal;
    }


    & {
        background-color: transparent;
        height: 3rem;
    }

    & .rc-time-picker-clear,
    & .rc-time-picker-clear-icon:after {
        display: none;
    }

    & .rc-time-picker-panel-select,
    & .rc-time-picker-input,
    & .rc-time-picker-panel-input {
        height: 3rem;
        font-family: "Inter", sans-serif;
        font-weight: normal;
        font-size: 18px;
        background-color: #1f2937;
        color: white;
        padding: 1rem;
        border-radius: 5rem;
        text-align: center;

        ::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
    }
`;


export const HourPicker = ({ onChange, value }: HourPickerProps) => {

  return (
      <StyledTimePicker
          onChange={onChange}
          value={value}
          defaultValue={moment()}
          showSecond={false}
          minuteStep={15}
          className="bg-amber-400"
      />
  );
};

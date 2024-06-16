import {ChosenWeekDay, WeekDaysDisplay} from "./WeekDaysDisplay.tsx";
import {CommuteTime} from "./CommuteTime.tsx";
import {CommuteProps} from "./MatchRow.tsx";

interface WeekDaysDisplayWithCommuteTimeProps {
    className?: string;
    chosenWeekDays: ChosenWeekDay[];
    commute: CommuteProps
}

export const WeekDaysDisplayWithCommuteTime = ({className, chosenWeekDays, commute} : WeekDaysDisplayWithCommuteTimeProps) => {
    return <div className={`${className}`}>
        <WeekDaysDisplay className={"pb-2"} chosenWeekDays={chosenWeekDays}></WeekDaysDisplay>
        <CommuteTime from={commute.from} to={commute.to} isTimeFitting={commute.isTimeFitting}></CommuteTime>
    </div>
}

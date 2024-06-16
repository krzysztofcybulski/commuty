import {WeekDaysDisplayWithCommuteTime} from "./WeekDaysDisplayWithCommuteTime.tsx";
import {ChosenWeekDay} from "./WeekDaysDisplay.tsx";
import {TypographyH4} from "./TypographyH4.tsx";

export interface CommuteProps {
    from: string;
    to: string;
    isTimeFitting: boolean;
}

interface MatchRowProps {
    username: string;
    description: string;
    chosenWeekDays: ChosenWeekDay[];
    commute: CommuteProps;
}

export const MatchRow = ({username, description, chosenWeekDays, commute}: MatchRowProps) => {
    return <div className="flex-col w-full">
        <div
            className="flex w-full justify-between items-center p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex items-center">
                <img className="w-20 h-20" src={`https://avatar.iran.liara.run/public/boy?username=${username}`}></img>
                <div className="flex-col mx-4">
                    <TypographyH4 text={username}/>
                    { username === "Tomasz" && "#rock-music #talkative"}
                    { username === "Krzysztof" && "#animal-friendly #pop"}
                    <p>{description}</p>
                </div>
            </div>
            <WeekDaysDisplayWithCommuteTime chosenWeekDays={chosenWeekDays}
                                            commute={commute}></WeekDaysDisplayWithCommuteTime>
        </div>
    </div>
}

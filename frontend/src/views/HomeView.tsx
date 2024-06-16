import {MatchRow} from "../components/MatchRow.tsx";
import {FoundMatches} from "../components/FoundMatches.tsx";

export const HomeView = () => {
    return <div className="w-full">
        <FoundMatches></FoundMatches>
        <MatchRow username={"test"} description={"test"} chosenWeekDays={[

        ]} commute={{
            from: "08:00",
            to: "18:00",
            isTimeFitting: true
        }}/>
        <MatchRow username={"test"} description={"test"} chosenWeekDays={[

        ]} commute={{
            from: "08:00",
            to: "18:00",
            isTimeFitting: true
        }}/>
    </div>;
}

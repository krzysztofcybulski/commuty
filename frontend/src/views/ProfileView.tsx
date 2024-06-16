import {BottomMenu} from "../components/BottomMenu.tsx";
import AnimateOnRender from "../components/AnimateOnRender.tsx";
import {SignOutButton} from "@clerk/clerk-react";

export const ProfileView = () => {
    return <div>
        <AnimateOnRender>
            <SignOutButton></SignOutButton>
        </AnimateOnRender>
        <BottomMenu chosen={'PROFILE'}/>
    </div>
}

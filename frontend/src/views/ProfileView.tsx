import {BottomMenu} from "../components/BottomMenu.tsx";
import AnimateOnRender from "../components/AnimateOnRender.tsx";

export const ProfileView = () => {
    return <div>
        <AnimateOnRender>
            <div>Profile</div>
        </AnimateOnRender>
        <BottomMenu chosen={'PROFILE'}/>
    </div>
}

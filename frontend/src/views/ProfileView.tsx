import {BottomMenu} from "../components/BottomMenu.tsx";
import AnimateOnRender from "../components/AnimateOnRender.tsx";

export const ProfileView = () => {
    return <AnimateOnRender>
        <BottomMenu chosen={'PROFILE'}/>
    </AnimateOnRender>
}

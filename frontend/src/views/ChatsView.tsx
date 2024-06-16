import {BottomMenu} from "../components/BottomMenu"
import AnimateOnRender from "../components/AnimateOnRender.tsx";

export const ChatsView = () => {
    return <AnimateOnRender>
        <BottomMenu chosen={'CHATS'}/>
    </AnimateOnRender>
}

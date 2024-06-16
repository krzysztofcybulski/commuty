import {BottomMenu} from "../components/BottomMenu"
import AnimateOnRender from "../components/AnimateOnRender.tsx";

export const ChatsView = () => {
    return <div>
        <AnimateOnRender>
            <div>Chats</div>
        </AnimateOnRender>
        <BottomMenu chosen={'CHATS'}/>
    </div>
}

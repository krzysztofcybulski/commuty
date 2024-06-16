import {useAppDispatch} from "../store/store.ts";
import {updateView} from "../store/appReducer.ts";

type ChosenItem = 'HOME' | 'CHATS' | 'PROFILE'

interface Props {
    chosen: ChosenItem
}

export const BottomMenu = ({chosen}: Props) => {

    const dispatch = useAppDispatch();

    return <div className="fixed flex bottom-8 w-full justify-center">
        <div
            className="w-2/3 flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <img className={`${chosen === 'HOME' ? 'invert' : ''}`} src="/home.svg" onClick={() => dispatch(updateView('HOME_PAGE'))}/>
            <img className={`${chosen === 'CHATS' ? 'invert' : ''}`} src="/chats.svg" onClick={() => dispatch(updateView('CHATS'))}/>
            <img className={`${chosen === 'PROFILE' ? 'invert' : ''}`} src="/profile.svg" onClick={() => dispatch(updateView('PROFILE'))}/>
        </div>
    </div>
}

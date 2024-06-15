import {updateUser} from "../store/userReducer.ts";
import {useAppDispatch} from "../store/store.ts";
import {UserResource} from '@clerk/types';

export const useSaveUserData = () => {

    const dispatch = useAppDispatch()

    return (user: UserResource | null | undefined) => {
        if (user !== undefined && user !== null) {
            dispatch(updateUser({
                name: user.fullName!,
                email: user.emailAddresses[0].emailAddress,
            }))
        } else {
            dispatch(updateUser(undefined))
        }
    }
}

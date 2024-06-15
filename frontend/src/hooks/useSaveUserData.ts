import {updateUser} from "../store/userReducer.ts";
import {useAppDispatch} from "../store/store.ts";
import {UserResource} from '@clerk/types';

export const useSaveUserData = () => {

    const dispatch = useAppDispatch()

    return (user: UserResource | null | undefined) => {
        console.log("fetching user data...")
        if (user) {
            dispatch(updateUser({
                name: user.fullName!,
                email: user.emailAddresses[0].emailAddress
            }))
        } else {
            dispatch(updateUser(undefined))
        }
    }
}

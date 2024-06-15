import {useUser} from "@clerk/clerk-react";
import {updateUser} from "../store/userReducer.ts";
import {useAppDispatch} from "../store/store.ts";

export const useFetchUserData = () => {

    const dispatch = useAppDispatch()
    const {user} = useUser()

    return () => {
        console.log("fetching user data...")
        if (user) {
            dispatch(updateUser({
                name: user.fullName!,
                email: user.emailAddresses[0].emailAddress
            }))
        }
    }
}

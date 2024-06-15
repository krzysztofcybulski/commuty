import {Link, Outlet} from "react-router-dom";
import {SignedIn, SignedOut, UserButton, useUser} from "@clerk/clerk-react";
import {useEffect} from "react";
import {useSaveUserData} from "../hooks/useSaveUserData.ts";

export const App = () => {

    const {user} = useUser()
    const saveUserData = useSaveUserData()

    useEffect(() => {
        saveUserData(user)
    }, []);

    return <div>
        <div className="bg-gray-100">
            <div className="bg-blue-500 p-4">
                <div className="container mx-auto flex justify-between">
                    <div className="text-white text-lg font-semibold">
                        <Link to="/">Commuty</Link>
                    </div>
                    <div className="space-x-4">
                        <Link to="/" className="text-white hover:text-gray-200">
                            Home
                        </Link>
                        <Link to="/about" className="text-white hover:text-gray-200">
                            About
                        </Link>
                        <SignedOut>
                            <Link to="/sign-in">Sign In</Link>
                        </SignedOut>
                        <SignedIn>
                            <UserButton afterSignOutUrl="/sign-in"/>
                        </SignedIn>
                    </div>
                </div>
            </div>
        </div>
        <main>
            <Outlet/>
        </main>
    </div>
}

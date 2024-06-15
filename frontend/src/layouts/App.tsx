import {Link, Outlet} from "react-router-dom";
import {SignedIn, SignedOut, UserButton} from "@clerk/clerk-react";
import {useFetchUserData} from "../hooks/useFetchUserData.ts";
import {useEffect} from "react";

export const App = () => {

    const fetchUserData = useFetchUserData()

    useEffect(() => {
        fetchUserData()
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

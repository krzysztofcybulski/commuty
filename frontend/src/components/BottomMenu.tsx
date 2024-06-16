import {SignOutButton} from "@clerk/clerk-react";

export const BottomMenu = () => {
    return <div className="fixed flex bottom-8 w-full justify-center">
        <div
            className="w-2/3 flex justify-between items-center p-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <SignOutButton></SignOutButton>
        </div>
    </div>
}

interface ButtonProps {
    text: string;
}

export const Button = ({text}: ButtonProps) => {
    return <button className="p-[2px] relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"/>
        <div
            className="px-8 py-2 bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            {text}
        </div>
    </button>
}

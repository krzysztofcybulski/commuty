export interface InputProps {
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
}

export const Input = ({placeholder, value, onChange}: InputProps) => {
    return <input
        type="text"
        id="large-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer h-10 w-full text-gray-900 focus:outline-none"
    />
}

import {useState} from "react";
import {Label} from "../components/Label.tsx";
import {Input} from "../components/Input.tsx";
import {useAppDispatch} from "../store/store.ts";
import {updateUserName} from "../store/appReducer.ts";

export const SetYourNameView = () => {

    const [name, setName] = useState('');
    const dispatch = useAppDispatch()

    const handleChangeName = (name: string) => {
        setName(name);
        dispatch(updateUserName(name))
    }

    return <div className="p-8">
        <Label title={"Your name"}>
            <Input value={name} placeholder={"Enter your name"} onChange={handleChangeName}></Input>
        </Label>
    </div>
}

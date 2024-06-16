import { useState } from 'react';
import { Label } from '../components/Label.tsx';
import { Input } from '../components/Input.tsx';
import { useAppDispatch } from '../store/store.ts';
import AnimateOnRender from "../components/AnimateOnRender.tsx";
import { selectUsername, updateUserName } from '../store/appReducer.ts';
import { useSelector } from 'react-redux';

export const SetYourNameView = () => {
  const dispatch = useAppDispatch();
  const userNameFromState = useSelector(selectUsername);
  const [name, setName] = useState(userNameFromState || '');

  const handleChangeName = (name: string) => {
    setName(name);
    dispatch(updateUserName(name));
  };

  return (
      <AnimateOnRender>
    <div className="p-8">
      <Label title={'Your name'}>
        <div>(it will be visible for other users)</div>
        <Input value={name} placeholder={'Enter your name'} onChange={handleChangeName}></Input>
      </Label>
    </div>
      </AnimateOnRender>
  );
};

import { SignUp, useUser } from '@clerk/clerk-react';
import AnimateOnRender from "../components/AnimateOnRender.tsx";

export const CreateAccountView = () => {
  const { user } = useUser();

  return (
      <AnimateOnRender>
    <div className="flex ">
      <div className="mx-auto">{!user && <SignUp />}</div>
    </div>
          </AnimateOnRender>
  );
};

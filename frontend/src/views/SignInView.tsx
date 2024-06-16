import { SignIn, useUser } from '@clerk/clerk-react';
import AnimateOnRender from "../components/AnimateOnRender.tsx";

export const SignInView = () => {
  const { user } = useUser();

  return (
      <AnimateOnRender>
    <div className="flex mx-auto h-screen items-center pb-24">
      <div className="mx-auto">{!user && <SignIn />}</div>
    </div>
      </AnimateOnRender>
  );
};

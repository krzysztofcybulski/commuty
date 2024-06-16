import { SignIn, useUser } from '@clerk/clerk-react';

export const SignInView = () => {
  const { user } = useUser();

  return (
    <div className="flex ">
      <div className="mx-auto">{!user && <SignIn />}</div>
    </div>
  );
};

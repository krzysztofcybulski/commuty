import { SignIn, useUser } from '@clerk/clerk-react';

export const SignInView = () => {
  const { user } = useUser();

  return (
    <div className="flex mx-auto h-screen items-center pb-24">
      <div className="mx-auto">{!user && <SignIn />}</div>
    </div>
  );
};

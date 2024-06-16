import { SignUp, useUser } from '@clerk/clerk-react';

export const CreateAccountView = () => {
  const { user } = useUser();

  return (
    <div className="flex ">
      <div className="mx-auto">{!user && <SignUp />}</div>
    </div>
  );
};

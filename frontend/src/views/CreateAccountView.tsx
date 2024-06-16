import { SignOutButton, SignUp, useUser } from '@clerk/clerk-react';

export const CreateAccountView = () => {
  const { user } = useUser();
  console.log(user);

  return (
    <div className="flex ">
      <div className="mx-auto">{!user && <SignUp />}</div>
    </div>
  );
};

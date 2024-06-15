import { SignIn } from '@clerk/clerk-react';

export default function SignInPage() {
  return (
    <>
      <div>test sign in</div>
      <SignIn path="/sign-in" />
    </>
  );
}

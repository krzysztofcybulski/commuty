import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
      {/* <header className="header">
        <div>
          <div>
            <p>Commuty xD</p>
          </div>
          <SignedIn>
            <UserButton afterSignOutUrl='/sign-in' />
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in">Sign In</Link>
          </SignedOut>
        </div>
      </header> */}
      <div className="bg-gray-100">
        <div className="bg-blue-500 p-4">
          <div className="container mx-auto flex justify-between">
            <div className="text-white text-lg font-semibold">
              <Link to="/">Commuty</Link>
            </div>
            <div className="space-x-4">
              <Link to="/" className="text-white hover:text-gray-200">
                Home
              </Link>
              <Link to="/about" className="text-white hover:text-gray-200">
                About
              </Link>
              <SignedOut>
                <Link to="/sign-in">Sign In</Link>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/sign-in" />
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </ClerkProvider>
  );
}

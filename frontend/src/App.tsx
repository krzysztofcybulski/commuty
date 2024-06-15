import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import './App.css'
import {ThreeDCardDemo} from "./components/ThreeDCardDemo.tsx";

function App() {
    return (
        <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    )
}

export default App

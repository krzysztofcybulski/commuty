import { ClerkProvider } from '@clerk/clerk-react';
import { Provider } from 'react-redux';
import { persistor, store } from '../store/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { RootView } from './RootView.tsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

export const App = () => {
  return (
    <main>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <RootView></RootView>
          </ClerkProvider>
        </PersistGate>
      </Provider>
    </main>
  );
};

// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store'; // note: changed import to include persistor

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');
const root = createRoot(rootElement);

const AppTree = (
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading saved data...</div>} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);

if (PUBLISHABLE_KEY) {
  root.render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      {AppTree}
    </ClerkProvider>
  );
} else {
  console.warn('VITE_CLERK_PUBLISHABLE_KEY not set — rendering without ClerkProvider.');
  root.render(AppTree);
}

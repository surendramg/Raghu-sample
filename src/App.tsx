import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { AuthErrorBoundary } from './components/auth-error-boundary';
import { Toaster } from './components/ui/toaster';
import { AuthProvider } from './lib/auth-context';

import { config } from './lib/config';

function App() {
  // Config validation is handled in config.ts

  return (
    <ClerkProvider publishableKey={config.clerkPublishableKey}>
      <AuthErrorBoundary>
        <AuthProvider>
          <ThemeProvider defaultTheme="dark">
            <Outlet />
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </AuthErrorBoundary>
    </ClerkProvider>
  );
}

export default App;

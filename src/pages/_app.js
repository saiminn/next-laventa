import '@/styles/globals.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { SnackbarProvider } from 'notistack';
import { useState } from 'react';
import { useEffect } from 'react';
import { StoreProvider } from 'utils/store';

export default function App({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  if (!showChild) {
    return null;
  }
  if (typeof window === 'undefined') {
    return <></>;
  } else {
    return (
      <SnackbarProvider
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <StoreProvider>
          <PayPalScriptProvider deferLoading={true} >
            {' '}
            <Component {...pageProps} />
          </PayPalScriptProvider>
        </StoreProvider>
      </SnackbarProvider>
    );
  }
}

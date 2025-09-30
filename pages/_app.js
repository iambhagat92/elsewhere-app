import '../styles/globals.css';
import ErrorBoundary from '../components/ErrorBoundary';

/**
 * Main Next.js App component
 * Wraps all pages with error boundary and global styles
 */
function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp;
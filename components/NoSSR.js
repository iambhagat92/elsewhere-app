import { useEffect, useState } from 'react';

/**
 * NoSSR - Component that only renders children on the client side
 * Prevents hydration mismatches for components that use browser APIs
 */
export default function NoSSR({ children, fallback = null }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return fallback;
  }

  return children;
}
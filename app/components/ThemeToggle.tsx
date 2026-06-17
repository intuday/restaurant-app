// 'use client';

// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';

// export default function ThemeToggle() {
//   const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     if (isDark) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [isDark]);

//   return (
//     <Button
//       variant="outline"
//       size="icon"
//       onClick={() => setIsDark(!isDark)}
//       className="rounded-full"
//     >
//       {isDark ? '☀️' : '🌙'}
//     </Button>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 1. Handle component mounting on the client side
  useEffect(() => {
    setMounted(true);
    
    // Check and match the user's system preference by default
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(isSystemDark);
  }, []);

  // 2. Synchronize the 'dark' class on the HTML document element
  useEffect(() => {
    if (!mounted) return;

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark, mounted]);

  // 3. Render a placeholder skeleton during server-side rendering to prevent mismatch
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="rounded-full"
        disabled
      >
        <span className="opacity-0">🌙</span>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setIsDark(!isDark)}
      className="rounded-full"
      suppressHydrationWarning // Silences attribute warnings injected by browser extensions
    >
      {isDark ? '☀️' : '🌙'}
    </Button>
  );
}
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Theme initialization is handled inline in `app/layout.tsx` via a
  // small script tag to avoid FOUC and client-side work during hydration.
  // Keep this a server component that simply renders children so it
  // doesn't contribute to client JS bundle size.
  return <>{children}</>;
}




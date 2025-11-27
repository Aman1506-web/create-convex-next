"use client";

// Stub provider used when Convex is not selected.
// when convex selected : The Convex original provider.tsx overlay file replaces this file with a real provider.
export default function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

"use client";

// Stub provider used when Convex is not selected.
// The Convex overlay replaces this file with a real provider.
export default function ConvexClientProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

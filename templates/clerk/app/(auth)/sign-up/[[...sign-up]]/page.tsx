import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <SignUp
        appearance={{
          elements: {
            rootBox: "shadow-xl rounded-xl border border-border/60",
            card: "shadow-none",
          },
        }}
      />
    </div>
  );
}

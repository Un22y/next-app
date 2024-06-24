import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-[calc(100vh-60px)] max-h-[calc(100vh-60px)] min-w-full bg-background">
      <main className="flex w-full flex-grow">{children}</main>;
    </div>
  );
}

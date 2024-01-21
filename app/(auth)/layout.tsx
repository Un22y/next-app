import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
        <Logo />
        <ThemeSwitcher />
      </nav>
      <main className="flex w-full h-full flex-grow items-center justify-center">
        {children}
      </main>
    </div>
  );
}

export default Layout;

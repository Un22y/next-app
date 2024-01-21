"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSetTheme: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.currentTarget.dataset.theme &&
      setTheme(event.currentTarget.dataset.theme);
  };

  if (!mounted) return null;
  return (
    <Tabs defaultValue={theme}>
      <TabsList className="border ">
        <TabsTrigger data-theme="light" value="light" onClick={handleSetTheme}>
          <SunIcon className="h-[1.2rem] w-[1.2rem]" />
        </TabsTrigger>
        <TabsTrigger data-theme="dark" value="dark" onClick={handleSetTheme}>
          <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
        </TabsTrigger>
        <TabsTrigger
          data-theme="system"
          value="system"
          onClick={handleSetTheme}
        >
          <DesktopIcon className="h-[1.2rem] w-[1.2rem]" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

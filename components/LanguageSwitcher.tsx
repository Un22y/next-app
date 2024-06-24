"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const setLanguage = useSetLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex gap-2">
      <button
        value={"en"}
        onClick={(event) => setLanguage(event.currentTarget.value)}
      >
        EN
      </button>
      <button
        value={"ru"}
        onClick={(event) => setLanguage(event.currentTarget.value)}
      >
        RU
      </button>
    </div>
  );
}

const useSetLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();
  //.join('/')
  const spliced = pathname.split("/");
  spliced.shift();
  spliced.shift();

  return (locale: string) => {
    // cast to string

    router.push(`/${locale}/${spliced.join("/")}`);
  };
};

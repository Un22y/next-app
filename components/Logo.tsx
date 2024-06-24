import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";

export default function Logo() {
  const title = useTranslations("Index");
  return (
    <Link
      href={"/"}
      className="font-bold text-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer"
    >
      {title("logo")}
    </Link>
  );
}

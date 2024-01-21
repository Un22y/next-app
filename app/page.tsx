import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="flex justify-center align-center w-full h-full">
      <Link href={"/form-builder"}>Form builder</Link>
    </div>
  );
}

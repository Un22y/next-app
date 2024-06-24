import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="flex items-center justify-center gap-4 min-h-[calc(100vh-60px)] max-h-[calc(100vh-60px)] min-w-full bg-background">
      <Button asChild className="px-4 py-2 border border-border rounded-md">
        <Link href={"/form-builder"}>Form builder</Link>
      </Button>
      <Button asChild className="px-4 py-2 border border-border rounded-md">
        <Link href={"/tasks"}>Task app</Link>
      </Button>
    </div>
  );
}

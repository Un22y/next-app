"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex h-full w-full justify-center items-center flex-col gap-4">
      <h2 className="text-destructive text-4xl">{error.message}</h2>
      <Button variant={"secondary"} asChild>
        <Link href={"/"}>Back to home</Link>
      </Button>
    </div>
  );
}

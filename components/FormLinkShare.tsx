"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImShare } from "react-icons/im";
import { useHandleCopyLink } from "./hooks/useHandleCopyLink";

export default function FormLinkShare({ shareUrl }: { shareUrl: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const shareLink = mounted
    ? `${window.location.origin}/submit/${shareUrl}`
    : "";
  const handleCopyLink = useHandleCopyLink(shareLink);
  if (!mounted) return null;

  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input value={shareLink} readOnly />
      <Button
        className="max-x-[250px]"
        onClick={() => {
          handleCopyLink();
        }}
      >
        <ImShare className="mr-2 h-4 w-4" />
        Share link
      </Button>
    </div>
  );
}

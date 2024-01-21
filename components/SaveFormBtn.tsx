import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { HiSaveAs } from "react-icons/hi";
import useDesigner from "./hooks/useDesigner";
import { toast } from "./ui/use-toast";
import { updateFormContent } from "@/actions/form";
import { FaSpinner } from "react-icons/fa";

export default function SaveFormButton({ id }: { id: number }) {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const saveForm = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await updateFormContent(id, jsonElements);
      toast({
        title: "Succsess",
        description: "Your form has been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "while saving your form; try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant={"outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => startTransition(saveForm)}
    >
      <HiSaveAs className="w-6 h-6" />
      Save
      {loading && <FaSpinner className="animate-spin" />}
    </Button>
  );
}

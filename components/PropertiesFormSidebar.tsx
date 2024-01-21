import React from "react";
import useDesigner from "./hooks/useDesigner";
import { formElements } from "./FormElements";
import { Button } from "./ui/button";
import { AiOutlineClose } from "react-icons/ai";
import { Separator } from "./ui/separator";

export default function PropertiesFormSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) {
    return null;
  }
  const PropertiesForm =
    formElements[selectedElement?.type].propertiesComponent;
  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Elements properties</p>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => {
            setSelectedElement(null);
          }}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
}

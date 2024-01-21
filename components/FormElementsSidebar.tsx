import React from "react";
import SidebarBtnElement from "./SidebarBtnElement";
import { formElements } from "./FormElements";
import { Separator } from "./ui/separator";

export default function FormElementsSidebar() {
  return (
    <div>
      <p className="text-small text-foreground/70">Drag and drop elements</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 space-y-4 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          Layout elements
        </p>
        <SidebarBtnElement formElement={formElements.TitleField} />
        <SidebarBtnElement formElement={formElements.SubtitleField} />
        <SidebarBtnElement formElement={formElements.ParagraphField} />
        <SidebarBtnElement formElement={formElements.SeparatorField} />
        <SidebarBtnElement formElement={formElements.SpacerField} />

        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          Form elements
        </p>
        <SidebarBtnElement formElement={formElements.TextField} />
        <SidebarBtnElement formElement={formElements.TextAreaField} />
        <SidebarBtnElement formElement={formElements.NumberField} />
        <SidebarBtnElement formElement={formElements.DateField} />
        <SidebarBtnElement formElement={formElements.SelectField} />
        <SidebarBtnElement formElement={formElements.CheckboxField} />
      </div>
    </div>
  );
}

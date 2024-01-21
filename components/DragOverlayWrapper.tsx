import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { SidebarBtnElementDragOverlay } from "./SidebarBtnElement";
import { ElementsType, formElements } from "./FormElements";
import useDesigner from "./hooks/useDesigner";

function DragOverlayWrapper() {
  const { elements } = useDesigner();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });
  const isSidebarBtnElement = draggedItem?.data?.current?.isDesignerBtnElement;
  const isDesignerElement = draggedItem?.data?.current?.isDesignerElement;
  const type = draggedItem?.data?.current?.type as ElementsType;
  let node = isSidebarBtnElement ? (
    <SidebarBtnElementDragOverlay formElement={formElements[type]} />
  ) : (
    <>NO!</>
  );

  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find((el) => el.id === elementId);
    if (!element) node = <>Element not found</>;
    else {
      const DesignerElementComponent =
        formElements[element.type].designerComponent;
      node = (
        <div className="pointer-events-none opacity-80 flex items-center justify-center bg-accent border rounded-md h-[120px] w-full py-2 px-4">
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  return (
    <DragOverlay dropAnimation={{ sideEffects: null, duration: 0 }}>
      {node}
    </DragOverlay>
  );
}

export default DragOverlayWrapper;

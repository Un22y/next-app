"use client";
import { Button } from "@/components/ui/button";
import { idGenerator } from "@/lib/idGenerator";
import { Column } from "@/shared/types/tasks/types";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import ColumnContainer from "../column-container/ColumnContainer";

export default function Cambaboard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const createNewColumn = () => {
    const newColumn: Column = {
      id: idGenerator(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, newColumn]);
  };
  return (
    <div className="p-4 m-auto flex min-h-[calc(100vh-60px)] items-center w-full overflow-x-auto overflow-y-hidden ">
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {!!columns.length &&
            columns.map(({ id, title }) => (
              <ColumnContainer key={id} column={{ id, title }} />
            ))}
        </div>
        <Button onClick={() => createNewColumn()} variant="outline" asChild>
          <button className="border border-text-foreground flex gap-2 items-center">
            Add column <PlusCircledIcon />
          </button>
        </Button>
      </div>
    </div>
  );
}

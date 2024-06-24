import { Column } from "@/shared/types/tasks/types";
import React from "react";

type ColumnContainerProps = {
  column: Column;
};

export default function ColumnContainer({ column }: ColumnContainerProps) {
  return (
    <div className="bg-accent flex flex-col w-[350px] h-[500px] max-h-[500px] rounded-md">
      <div className="flex items-center bg-black">
        <span className="flex justify-center items-center bg-destructive px-2 py-1 text-sm rounded-full">
          0
        </span>
        <p className="text-md h-[60px] cursor-grab rounded-md  rounded-b-none p-3 font-bold border-background border-4">
          {column.title}
        </p>
      </div>
      <div className="flex-grow flex">Content</div>
      <div>Footer</div>
    </div>
  );
}

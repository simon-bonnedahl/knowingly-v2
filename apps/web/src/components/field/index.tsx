import { useQuery } from "convex/react";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";

import { api } from "@knowingly/backend/convex/_generated/api";
import type { Id } from "@knowingly/backend/convex/_generated/dataModel";
import type { Field as FieldType, FieldValue } from "@knowingly/backend/convex/types";
import { Icons } from "@knowingly/icons";
import { Button } from "@knowingly/ui/button";

import { EditField } from "./edit-field";
import { FieldSettings } from "./field-settings";

interface FieldProps {
  field: FieldType;
  onEditValue: (id: Id<"fields">, value: FieldValue) => void;
  onDeleteField: (id: Id<"fields">) => void;
  preview?: boolean;
}

export const Field = ({
  field,
  onEditValue,
  onDeleteField,
  preview = false,
}: FieldProps) => {
  const y = useMotionValue(0);
  const dragControls = useDragControls();

  const res = useQuery(api.fields.get, { id: field.id });
  if (!res) return null;

  if (preview) {
    return (
      <div className="ml-5 flex items-start">
        <FieldSettings
          field={res}
          onEditValue={onEditValue}
          onDeleteField={onDeleteField}
        />
        <EditField
          field={res}
          onEditValue={onEditValue}
          fieldValue={field.value}
        />
      </div>
    );
  }

  return (
    <Reorder.Item
      value={field}
      id={field.id}
      style={{ y }}
      dragListener={false}
      dragControls={dragControls}
      className="group flex items-start"
    >
      <Button
        variant="ghost"
        size={"sm"}
        onPointerDown={(event) => dragControls.start(event)}
        className="px-1 text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        <Icons.gripVertical className="h-4 w-4" />
      </Button>
      <FieldSettings
        field={res}
        onEditValue={onEditValue}
        onDeleteField={onDeleteField}
      />
      <EditField
        field={res}
        onEditValue={onEditValue}
        fieldValue={field.value}
      />
    </Reorder.Item>
  );
};

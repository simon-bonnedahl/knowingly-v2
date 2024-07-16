"use client";

import React, { useEffect, useState } from "react";

import { useMotionValue, Reorder, useDragControls } from "framer-motion";

import { Icon, Icons } from "~/components/icons";
import { CustomField } from "~/components/custom-field";
import { useMutation } from "convex/react";
import { api } from "@knowingly/backend/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@knowingly/backend/convex/_generated/dataModel";
import { Button } from "@knowingly/ui/button";

interface CustomFieldsProps {
  customFields: {
    id: Id<"customFields">;
    value: string | number | boolean | string[];
}[]
preview?: boolean;

}

export const CustomFields = ({customFields, preview=false}: CustomFieldsProps) => {
  const {slug } = useParams();

  const [fields, setFields] = useState(customFields)


  if (!fields) return null;
  const updateFields = useMutation(api.pages.update)
  const addField = useMutation(api.pages.addCustomField)


  useEffect(() => {
    const debounce = setTimeout(() => {
      if (!fields) return;
      updateFields({
        slug: slug as string,
        field: "customFields",
        value: fields,
      });
    }, 1000);

    return () => clearTimeout(debounce);
  }, [fields]);


  const onEditValue = (id: string, value: any) => {
    setFields((fields) => {
      return fields.map((field) => {
        if (field.id === id) {
          return { ...field, value };
        }
        return field;
      });
    });
  }

  const onAddField = async() => {
    const field = await addField({
      slug: slug as string,
    });

    setFields((fields) => {
      return [
        ...fields,
        {
          id: field._id,
          value: "",
        },
      ];
    }
    );
  }
  const onDeleteField = (id: string) => {
    setFields((fields) => {
      return fields.filter((field) => field.id !== id);
    });
  }





  return (
    <div className="w-full px-24 mt-4">
     
    {!preview ? (
      <>
      <Reorder.Group axis="y" onReorder={setFields} values={fields} >
    
      {fields.map((field) => (
        <CustomField key={field.id} field={field} onEditValue={onEditValue} onDeleteField={onDeleteField}  />
      ))}
      
    </Reorder.Group>
      <Button variant="ghost" className="flex w-40 items-center justify-start gap-1 truncate text-muted-foreground hover:text-muted-foreground  ml-6" onClick={onAddField}>
      <Icons.plus className="w-4 h-4" />
      Add Field
    </Button>
    </>
    ) : (
      <>
      {fields.map((field) => (
        <CustomField key={field.id} field={field} onEditValue={onEditValue} preview={true}  onDeleteField={() => null}/>
      ))}
      </>
    )}
    

    
    </div>
  );
};


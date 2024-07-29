"use client";

import { useEffect, useState } from "react";

import { Reorder } from "framer-motion";

import { CustomField } from "~/components/custom-field";
import { useMutation } from "convex/react";
import { api } from "@knowingly/backend/convex/_generated/api";
import { useParams } from "next/navigation";
import type { Id } from "@knowingly/backend/convex/_generated/dataModel";
import { Button } from "@knowingly/ui/button";
import { Icons } from "@knowingly/icons";

interface CustomFieldsProps {
  customFields: {
    id: Id<"customFields">;
    value: string | number | boolean | string[];
}[]
preview?: boolean;

}

export const CustomFields = ({customFields, preview=false}: CustomFieldsProps) => {
  const {slug } = useParams();
  const updateFields = useMutation(api.pages.update)
  const addField = useMutation(api.pages.addCustomField)

  const [fields, setFields] = useState(customFields)





  useEffect(() => {
    const debounce = setTimeout(() => {
      if (!fields) return;
      void updateFields({
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


  if (!fields) return null;


  return (
    <div className="w-full px-24 py-4">
     
    {!preview ? (
      <>
      <Reorder.Group axis="y" onReorder={setFields} values={fields} >
    
      {fields.map((field) => (
        <CustomField key={field.id} field={field} onEditValue={onEditValue} onDeleteField={onDeleteField}  />
      ))}
      
    </Reorder.Group>
      <Button variant="ghost" className="flex w-40 items-center justify-start gap-1 truncate text-muted-foreground hover:text-muted-foreground  ml-6" onClick={onAddField}>
      <Icons.plus className="w-5 h-5" />
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


"use client";

import { useEffect, useState } from "react";

import { Reorder } from "framer-motion";

import { useMutation } from "convex/react";
import { api } from "@knowingly/backend/convex/_generated/api";
import { useParams } from "next/navigation";
import type { Id } from "@knowingly/backend/convex/_generated/dataModel";
import { Button } from "@knowingly/ui/button";
import { Icons } from "@knowingly/icons";
import { Field as FieldType, FieldValue } from "@knowingly/backend/convex/types";
import { useDebounce } from "~/lib/hooks/useDebounce";
import { toast } from "sonner";
import { Field } from ".";
import { useEdit } from "~/lib/hooks/useEdit";
import { useSubdomain } from "~/lib/hooks/useSubdomain";


interface FieldListProps {
  fields: FieldType[]
  isPage?: boolean

}

export const FieldList = ({fields, isPage=false}: FieldListProps) => {
  const { id } = useParams();
  const { edit} = useEdit();
  const subdomain = useSubdomain();
  const updatePage = useMutation(api.pages.update)
  const updateHub = useMutation(api.hubs.update)
  const createField = useMutation(api.fields.create)
  

  const [fieldList, setFieldList] = useState(fields)





  useEffect(() => {
      if (fieldList === fields) return;
      if (isPage){
        toast.promise(updatePage({
          id: id as Id<"pages">,
          field: "fields",
          value: fieldList,
        }), {
          error: (error) => `Error: ${error.data ?? "Something went wrong"}`,
        })
        return
      }
      toast.promise(updateHub({
        subdomain,
        field: "fields",
        value: fieldList,
      }), {
        error: (error) => `Error: ${error.data ?? "Something went wrong"}`,
      })


  }, [fieldList]);


  const onEditValue = (id: Id<"fields">, value: FieldValue) => {
    setFieldList((fieldList) => {
      return fieldList.map((field) => {
        if (field.id === id) {
          return { ...field, value };
        }
        return field;
      });
    });
  }

  const onAddField = async() => {
    const fieldId = await createField()

    setFieldList((fieldList) => {
      return [
        ...fieldList,
        {
          id: fieldId,
          value: "",
        },
      ];
    }
    );
  }
  const onDeleteField = (id: string) => {
    setFieldList((fieldList) => {
      return fieldList.filter((field) => field.id !== id);
    });
  }


  if (!fieldList) return null;


  return (
    <div className="w-full py-4 -ml-6 ">
     
    {edit ? (
      <>
      <Reorder.Group axis="y" onReorder={setFieldList} values={fieldList} >
    
      {fieldList.map((field) => (
        <Field key={field.id} field={field} onEditValue={onEditValue} onDeleteField={onDeleteField}  />
      ))}
      
    </Reorder.Group>
      <Button variant="ghost" className="flex w-[12.3rem] items-center justify-start gap-1 truncate text-muted-foreground hover:text-muted-foreground  ml-6" size={"sm"} onClick={onAddField}>
      <Icons.plus className="w-5 h-5" />
      Add Field
    </Button>
    </>
    ) : (
      <>
      {fieldList.map((field) => (
        <Field key={field.id} field={field} onEditValue={onEditValue} preview={true}  onDeleteField={() => null}/>
      ))}
      </>
    )}
    

    
    </div>
  );
};


import { useEffect, useRef, useState } from "react";

import { Id } from "@knowingly/backend/convex/_generated/dataModel";
import { Button } from "@knowingly/ui/button";
import { Input } from "@knowingly/ui/input";

import { CustomFieldTypeKey, CustomFieldTypes } from "./types";
import { usePreview } from "~/lib/hooks/usePreview";

interface EditFieldProps {
  field: {
    value: any;
    _id: Id<"customFields">;
    _creationTime: number;
    icon?: string | undefined;
    options?:
      | {
          suggestions?: string[] | undefined;
          format?: string | undefined;
        }
      | undefined;
    name: string;
    type: string;
    isLocked: boolean;
    isSuggested: boolean;
    slug: string;
  };
  onEditValue: (id: string, value: any) => void;
}
export const EditField = ({ field, onEditValue }: EditFieldProps) => {
  const [value, setValue] = useState(field.value);
  const [active, setActive] = useState(false);
  const {preview} = usePreview();

  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      onEditValue(field._id, value);
    }, 1000);
    return () => clearTimeout(debounce);
  }, [value]);


  const CustomFieldValueInput = CustomFieldTypes[field.type as CustomFieldTypeKey].valueInput;
  const CustomFieldButton = CustomFieldTypes[field.type as CustomFieldTypeKey].button;
  if(preview) {
    return(
        <div
          className=" w-96 items-center justify-start truncate px-4 inline-flex whitespace-nowrap rounded-md text-sm font-medium"
        >
        <CustomFieldButton value={value} options={field.options} />
        </div>
    )
  }
  return (
    <div className="w-96" ref={ref}>
      {active ? (
        <CustomFieldValueInput
          value={value}
          setValue={setValue}
        />
      ) : (
        <Button
          variant="ghost"
          className="flex w-full items-center justify-start truncate"
          disabled={preview}
          onClick={() => setActive(true)}
        >   
            {value ? (
          <CustomFieldButton value={value} options={field.options} />

                
            ): 
            (<span className="text-muted-foreground">Empty</span>)}
        </Button>
      )}
    </div>
  );
};

import { useEffect, useRef, useState } from "react";

import { Button } from "@knowingly/ui/button";

import type { CustomFieldTypeKey } from "./types";
import { CustomFieldTypes } from "./types";
import { usePreview } from "~/lib/hooks/usePreview";
import type { Ent } from "@knowingly/backend/convex/types";

interface EditFieldProps {
  field: Ent<"customFields">;
  fieldValue: any;
  onEditValue: (id: string, value: any) => void;
}
export const EditField = ({ field, fieldValue, onEditValue }: EditFieldProps) => {
  const [value, setValue] = useState(fieldValue);
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
          className=" w-full items-center justify-start truncate px-4 inline-flex whitespace-nowrap rounded-md text-sm font-medium  py-2"
        >
        <CustomFieldButton value={value} options={field.options} />
        </div>
    )
  }
  return (
    <div className="w-full" ref={ref}>
      {active ? (
        <CustomFieldValueInput
          value={value}
          setValue={setValue}
        />
      ) : (
        <Button
          variant="ghost"
          className="flex w-full items-center justify-start truncate h-fit"
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

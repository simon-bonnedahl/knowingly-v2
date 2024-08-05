import { useEffect, useRef, useState } from "react";

import { Button } from "@knowingly/ui/button";

import type { Ent, FieldValue } from "@knowingly/backend/convex/types";
import { Id } from "@knowingly/backend/convex/_generated/dataModel";
import { Fields } from "./types";
import { useDebounce } from "~/lib/hooks/useDebounce";
import { useEdit } from "~/lib/hooks/useEdit";

interface EditFieldProps {
  field: Ent<"fields">;
  fieldValue: FieldValue;
  onEditValue: (id: Id<"fields">, value: FieldValue) => void;
}
export const EditField = ({ field, fieldValue, onEditValue }: EditFieldProps) => {
  const [value, setValue] = useState(fieldValue);
  const debouncedValue = useDebounce(value, 3000);
  const [active, setActive] = useState(false);
  const {edit} = useEdit();

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
      onEditValue(field._id, debouncedValue);
  }, [debouncedValue]);


  const FieldValueInput = Fields[field.type].valueInput;
  const FieldButton = Fields[field.type].button;
  if(!edit) {
    return(
        <div
          className=" w-full items-center justify-start truncate px-4 inline-flex whitespace-nowrap rounded-md text-sm font-medium  py-2"
        >
        <FieldButton value={value} options={field.options} />
        </div>
    )
  }
  return (
    <div className="w-full" ref={ref}>
      {active ? (
        <FieldValueInput
          value={value}
          setValue={setValue}
        />
      ) : (
        <Button
          variant="ghost"
          className="flex w-full items-center justify-start truncate h-fit"
          disabled={!edit}
          onClick={() => setActive(true)}
        >   
            {value ? (
          <FieldButton value={value} options={field.options} />

                
            ): 
            (<span className="text-muted-foreground">Empty</span>)}
        </Button>
      )}
    </div>
  );
};

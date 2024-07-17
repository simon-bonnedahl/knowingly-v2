import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@knowingly/backend/convex/_generated/api";
import { Icon, Icons } from "../icons";
import { FieldSettings } from "./field-settings";
import { EditField } from "./edit-field";
import { name } from "@stream-io/video-react-sdk";
import { Button } from "@knowingly/ui/button";

interface CustomFieldsProps {
        field : {
        id: string;
        value: any;
        }
        onEditValue: (id: string, value: any) => void;
        onDeleteField: (id: string) => void;
        preview?: boolean;
}

export const CustomField = ({field, onEditValue, onDeleteField, preview=false} : CustomFieldsProps) => {
    const y = useMotionValue(0);
    const dragControls = useDragControls();
  
    const res = useQuery(api.customFields.get, { id: field.id });
    if (!res) return null;

    const fullField = {...res, value: field.value};

    if(preview) {
        return(
            <div className="flex items-start ml-6">
                <FieldSettings field={fullField}  onEditValue={onEditValue} onDeleteField={onDeleteField}/>
                <EditField field={fullField} onEditValue={onEditValue}/>
            </div>
        )
    }

  
    return (
      <Reorder.Item
      value={field}
      id={field.id}
      style={{  y }}
      dragListener={false}
      dragControls={dragControls}
      className="flex group items-start"
    >
      <Button variant="ghost"   onPointerDown={(event) => dragControls.start(event)} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-1 text-muted-foreground">
      <Icons.gripVertical className="w-4 h-4"/>
      </Button>
      <FieldSettings field={fullField}  onEditValue={onEditValue} onDeleteField={onDeleteField}/>
      <EditField field={fullField} onEditValue={onEditValue}/>
  
    </Reorder.Item>
  
    );
  };
  
  
"use client";

import { defaultProps } from "@blocknote/core";
import {
  createReactBlockSpec,
} from "@blocknote/react";
import { Excalidraw } from "@excalidraw/excalidraw";
import { Button } from "@knowingly/ui/button";
import { v } from "convex/values";



export const BlocknoteExcalidraw = createReactBlockSpec(
  {
    type: "excalidraw",
    propSchema: {
        data: {
          default: "",
        },
      },
    
    content: "inline",
  },
  {
    render: (props) => {
      return (
        <ExcalidrawWrapper props={props} />
      );
    },
  }
);


const ExcalidrawWrapper = ({ props } : any) => {

    const initialData = props.block.props.data ? JSON.parse(props.block.props.data) : undefined

    const onChange = (value: any) => {
        console.log(value)
        props.editor.updateBlock(props.block, {
            type: "excalidraw",
            props: { data: JSON.stringify({elements: value}) },
          })

    }
    

    return(
        <div className="w-full aspect-video" ref={props.contentRef}>
        <Excalidraw viewModeEnabled={!props.editor.isEditable}  onChange={onChange} initialData={initialData } />
        </div>
    )
}
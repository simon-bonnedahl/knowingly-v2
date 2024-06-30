"use client";

import { defaultProps } from "@blocknote/core";
import {
  createReactBlockSpec,
} from "@blocknote/react";
import { Button } from "@knowingly/ui/button";


export const BlocknoteButton = createReactBlockSpec(
  {
    type: "button",
    propSchema: {
    textAlignment: defaultProps.textAlignment,
      actionPath : {
        type: "string",
        default: "",
      },
    },
    content: "inline",
  },
  {
    render: (props) => {
      return (
        <Button>
            <span ref={props.contentRef}></span>
        </Button>
      );
    },
  }
);


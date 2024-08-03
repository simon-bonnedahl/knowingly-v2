"use client"

import { useTheme } from "next-themes";
import { BlockNoteSchema, defaultInlineContentSpecs, defaultStyleSchema } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import type { Theme } from "@blocknote/mantine";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/style.css";

import {
  defaultBlockSpecs
} from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";

import "@blocknote/mantine/style.css";
import { BlocknoteGlobe } from "./components/globe";
import { BlocknoteButton } from "./components/button";
import { BlocknoteAlert } from "./components/alert";



interface EditorProps {
  initialContent?: string
  editable?: boolean
}

const Editor = ({  initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme()




  const darkTheme = {
    ...defaultStyleSchema,
    colors: {
      editor: {
        text: "#ffffff",
        background: "​#09090b",
      },
      sideMenu: "#ffffff",
    }
  } satisfies Theme;

  const schema = BlockNoteSchema.create({
    blockSpecs: {
      ...defaultBlockSpecs,
      alert: BlocknoteAlert,
      button: BlocknoteButton,
      globe: BlocknoteGlobe,
    },
    inlineContentSpecs: {
      ...defaultInlineContentSpecs,
      // Adds the mention tag.
    },

  });






const editor = useCreateBlockNote({
  schema,
  initialContent: JSON.parse(initialContent ?? "[]"),

})
 

  return (
      <BlockNoteView
        editor={editor}
        editable={editable}
        className="w-full "
        draggable={false}
        sideMenu={false}
        
        
        
        theme={resolvedTheme === "dark" ? darkTheme : "light"}
      >
       
      </BlockNoteView>
  )
}

export default Editor
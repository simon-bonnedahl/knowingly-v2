"use client"

import { useTheme } from "next-themes"
import {  BlockNoteSchema, PartialBlock, defaultInlineContentSpecs, defaultStyleSchema } from "@blocknote/core"
import {  DefaultReactSuggestionItem, SuggestionMenuController, getDefaultReactSlashMenuItems, useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView, Theme} from "@blocknote/mantine"
import "@blocknote/core/style.css"

import {
  defaultBlockSpecs,
  filterSuggestionItems,
  insertOrUpdateBlock,
} from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";

import "@blocknote/mantine/style.css";
import { BlocknoteProfileGallery } from "./components/profile-gallery"
import {  IconGlobe, IconLayersSubtract, IconUsers } from "@tabler/icons-react"
import { BlocknoteGlobe } from "./components/globe"
import { BlocknoteButton } from "./components/button"
import { BlocknoteMention } from "./components/mention"
import { useMutation, useQuery } from "convex/react"
import { api } from "@knowingly/backend/convex/_generated/api"
import { useSubdomain } from "~/lib/hooks/useSubdomain"
import { uploadFile } from "./upload-file"
import { BlocknoteAlert } from "./components/alert"



interface EditorProps {
  onChange: (value:any) => void
  initialContent?: string
  editable?: boolean
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme()
  const subdomain = useSubdomain();
  const members = useQuery(api.hubs.getMembers, { subdomain });
  const pages = useQuery(api.pages.getPagesByHub, { subdomain });
  const getUploadUrl = useMutation(api.files.generateUploadUrl);





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
      profileGallery: BlocknoteProfileGallery,
      globe: BlocknoteGlobe,
    },
    inlineContentSpecs: {
      ...defaultInlineContentSpecs,
      // Adds the mention tag.
      mention: BlocknoteMention,
    },

  });
  const insertProfileGallery = (editor: typeof schema.BlockNoteEditor) => ({
    title: "Profile Gallery",
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: "profileGallery",
      });
    },
    group: "Database",
    icon: <IconUsers width={18} />,
  });

  const insertGlobe = (editor: typeof schema.BlockNoteEditor) => ({
    title: "Globe",
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: "globe",
      });
    },
    group: "Random",
    icon: <IconGlobe width={18} />,
  });
  const insertAlert = (editor: typeof schema.BlockNoteEditor) => ({
    title: "Alert",
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: "alert",
      });
    },
    group: "Text",
    icon: <IconLayersSubtract width={18} />,
  });
  const insertButton = (editor: typeof schema.BlockNoteEditor) => ({
    title: "Button",
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: "button",
      });
    },
    group: "Text",
    icon: <IconLayersSubtract width={18} />,
  });
  // const insertExcalidraw = (editor: typeof schema.BlockNoteEditor) => ({
  //   title: "Excalidraw",
  //   onItemClick: () => {
  //     insertOrUpdateBlock(editor, {
  //       type: "excalidraw",
  //     });
  //   },
  //   group: "Random",
  //   icon: <Icons.pencil className="h-5 w-5" />,
  // });





  const getMentionMenuItems = (
  editor: typeof schema.BlockNoteEditor
): DefaultReactSuggestionItem[] => {
 
  return pages?.map((page) => ({
    title: page.name,
    onItemClick: () => {
      editor.insertInlineContent([
        {
          type: "mention",
          props: {
            user: page.name,
            href: `/${page.slug}`,
          },
        },
        " ", // add a space after the mention
      ]);
    },
  })) ?? [];
};

const editor = useCreateBlockNote({
  uploadFile: async(file) => uploadFile(file, await getUploadUrl()),
  schema,
  initialContent: JSON.parse(initialContent ?? "[]"),

})
 

  return (
      <BlockNoteView
        editor={editor}
        editable={editable}
        onChange={() => onChange(editor.document)}
      
        className="w-full "
        slashMenu={false} // Disables the default slash menu
        
        
        theme={resolvedTheme === "dark" ? darkTheme : "light"}
      >
        <SuggestionMenuController
        triggerCharacter={"@"}
        getItems={async (query) =>
          // Gets all default slash menu items and `insertAlert` item.
          filterSuggestionItems(getMentionMenuItems(editor), query)
        }
      />
        <SuggestionMenuController
        triggerCharacter={"/"}
        getItems={async (query) =>
          // Gets all default slash menu items and `insertAlert` item.
          filterSuggestionItems(
            [...getDefaultReactSlashMenuItems(editor), insertProfileGallery(editor), insertGlobe(editor), insertAlert(editor), insertButton(editor)],
            query
          )
        }
      />
      </BlockNoteView>
  )
}

export default Editor
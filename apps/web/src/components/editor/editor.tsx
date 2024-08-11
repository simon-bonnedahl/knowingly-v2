"use client";

import type { Theme } from "@blocknote/mantine";
import type { DefaultReactSuggestionItem } from "@blocknote/react";
import {
  BlockNoteSchema,
  defaultInlineContentSpecs,
  defaultStyleSchema,
} from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import {
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { useTheme } from "next-themes";

import "@blocknote/core/style.css";

import {
  defaultBlockSpecs,
  filterSuggestionItems,
  insertOrUpdateBlock,
} from "@blocknote/core";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { useMutation, useQuery } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Icons } from "@knowingly/icons";

import { useSingleQuery } from "~/lib/hooks/useSingleQuery";
import { useSubdomain } from "~/lib/hooks/useSubdomain";
import { BlocknoteAlert } from "./components/alert";
import { BlocknoteButton } from "./components/button";
import { BlocknoteGallery } from "./components/gallery";
import { BlocknoteGlobe } from "./components/globe";
import { BlocknoteMention } from "./components/mention";
import { uploadFile } from "./upload-file";

interface EditorProps {
  onChange: (value: any) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const subdomain = useSubdomain();
  // const members = useQuery(api.hubs.getMembers, { subdomain });
  const getUploadUrl = useMutation(api.files.generateUploadUrl);
  const createCollection = useMutation(api.collections.create);

  const hubPages = useSingleQuery(api.pages.getPagesByHub, { subdomain });

  const darkTheme = {
    ...defaultStyleSchema,
    colors: {
      editor: {
        text: "#ffffff",
        background: "​#09090b",
      },
      sideMenu: "#ffffff",
    },
  } satisfies Theme;

  const schema = BlockNoteSchema.create({
    blockSpecs: {
      ...defaultBlockSpecs,
      alert: BlocknoteAlert,
      button: BlocknoteButton,
      gallery: BlocknoteGallery,
      globe: BlocknoteGlobe,
    },
    inlineContentSpecs: {
      ...defaultInlineContentSpecs,
      // Adds the mention tag.
      mention: BlocknoteMention,
    },
  });
  const insertGallery = (editor: typeof schema.BlockNoteEditor) => ({
    title: "Gallery",
    onItemClick: async () => {
      const collection = await createCollection({ subdomain });
      insertOrUpdateBlock(editor, {
        type: "gallery",
        props: {
          collectionId: collection._id,
        },
      });
    },
    group: "Collection",
    icon: <Icons.layoutGrid className="size-4" />,
  });

  const insertGlobe = (editor: typeof schema.BlockNoteEditor) => ({
    title: "Globe",
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: "globe",
      });
    },
    group: "Random",
    icon: <Icons.world className="size-4" />,
  });
  const insertAlert = (editor: typeof schema.BlockNoteEditor) => ({
    title: "Alert",
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: "alert",
      });
    },
    group: "Text",
    icon: <Icons.infoCircle className="size-4" />,
  });
  const insertButton = (editor: typeof schema.BlockNoteEditor) => ({
    title: "Button",
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: "button",
      });
    },
    group: "Text",
    icon: <Icons.copy className="size-4" />,
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
    editor: typeof schema.BlockNoteEditor,
  ): DefaultReactSuggestionItem[] => {
    return (
      hubPages?.map((page) => ({
        title: page.name,
        onItemClick: () => {
          editor.insertInlineContent([
            {
              type: "mention",
              props: {
                user: page.name,
                href: `/${page._id}`,
                image: page.banner.value ?? "",
              },
            },
            " ", // add a space after the mention
          ]);
        },
      })) ?? []
    );
  };

  const editor = useCreateBlockNote({
    uploadFile: async (file) => uploadFile(file, await getUploadUrl()),
    schema,
    initialContent: JSON.parse(initialContent ?? "[]"),
  });

  return (
    <BlockNoteView
      id="editor"
      editor={editor}
      editable={editable}
      // onChange={() => onChange(editor.document)}
      onBlur={() => onChange(editor.document)}
      className="w-full"
      slashMenu={false} // Disables the default slash menu
      theme={resolvedTheme === "dark" ? darkTheme : "light"}
    >
      <SuggestionMenuController
        triggerCharacter={"@"}
        getItems={async (query) =>
          filterSuggestionItems(getMentionMenuItems(editor), query)
        }
      />
      <SuggestionMenuController
        triggerCharacter={"/"}
        getItems={async (query) =>
          filterSuggestionItems(
            [
              ...getDefaultReactSlashMenuItems(editor),
              insertGallery(editor),
              insertGlobe(editor),
              insertAlert(editor),
              insertButton(editor),
            ],
            query,
          )
        }
      />
    </BlockNoteView>
  );
};

export default Editor;

import React from 'react';
import { EditorContent } from '@tiptap/react';
import { useTenTap, CoreBridge } from '@10play/tentap-editor';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';

/**
 * Here we control the web side of our custom editor
 */
export const AdvancedEditor = () => {
  const editor = useTenTap({
    bridges: [CoreBridge],
    tiptapOptions: {
      extensions: [Document, Paragraph, Text],
    },
  });
  return <EditorContent editor={editor} />;
};
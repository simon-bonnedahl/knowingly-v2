import React, { useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { ColorKeyboard, CoreBridge, CustomKeyboard, RichText, TenTapStartKit, Toolbar, useEditorBridge, useEditorContent } from '@10play/tentap-editor';
import { useTheme } from '@react-navigation/native';
import { darkEditorTheme, darkEditorCss, defaultEditorTheme } from '@10play/tentap-editor';
import { ToolbarWithColor } from './Toolbar';

import { editorHtml } from '~/editor-web/build/editorHtml';



const transformBlockNoteTo10tap = (blockNoteJson: string) => {
    const blockNoteDoc = JSON.parse(blockNoteJson);
  
    return {
      type: "doc",
      content: blockNoteDoc?.map(block => ({
        type: block.type,
        attrs: block.props || {},
        content: block.content?.map(item => ({
          type: item.type,
          text: item.text || '',
          styles: item.styles || {},
          children: item.children || [],
        }))
      }))
    };
  };
  
  const transform10tapToBlockNote = (tiptapJson: TiptapDoc): BlockNoteDoc => {
    return tiptapJson?.content?.map(block => ({
      id: generateUniqueId(), // Assuming you need a unique ID for each block
      type: block.type,
      props: block.attrs || {},
      content: block.content?.map(item => ({
        type: item.type,
        text: item.text || '',
        styles: item.styles || {},
        children: item.children || [],
      }))
    }));
  };
  
  // Helper function to generate a unique ID
  const generateUniqueId = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
  

interface EditorProps {
    onChange: (value:any) => void
    initialContent?: string
    editable?: boolean
  }

export const Editor = ({initialContent, onChange, editable} : EditorProps) => {

  const rootRef = useRef(null);
const [activeKeyboard, setActiveKeyboard] = React.useState<string>();

  const theme = useTheme();
  const editor = useEditorBridge({
    customSource: editorHtml,
    bridgeExtensions: [
      ...TenTapStartKit,
      CoreBridge.configureCSS(theme.dark ? darkEditorCss : ""), // <--- Add our dark mode css
    ],
    theme: defaultEditorTheme,
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent:  transformBlockNoteTo10tap(initialContent!),
    
  });

  // const content = useEditorContent(editor, { type: "json" });

    // useEffect(() => {
    //     if (!content) return;
    //     // console.log("CONTENT", content);
    //     onChange(transform10tapToBlockNote(content));
    // }, [content]);





  return null
};

const exampleStyles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  keyboardAvoidingView: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
});

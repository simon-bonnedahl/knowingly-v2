import { ColorKeyboard, DEFAULT_TOOLBAR_ITEMS, EditorBridge, Images, Toolbar, useBridgeState, useKeyboard } from "@10play/tentap-editor";

interface ToolbarWithColorProps {
    editor: EditorBridge;
    activeKeyboard: string | undefined;
    setActiveKeyboard: (id: string | undefined) => void;
  }
export const ToolbarWithColor = ({
    editor,
    activeKeyboard,
    setActiveKeyboard,
  }: ToolbarWithColorProps) => {
    // Get updates of editor state
    const editorState = useBridgeState(editor);
  
    const { isKeyboardUp: isNativeKeyboardUp } = useKeyboard();
    const customKeyboardOpen = activeKeyboard !== undefined;
    const isKeyboardUp = isNativeKeyboardUp || customKeyboardOpen;
  
    // Here we make sure not to hide the keyboard if our custom keyboard is visible
    const hideToolbar =
      !isKeyboardUp || (!editorState.isFocused && !customKeyboardOpen);
  
    return (
      <Toolbar
        editor={editor}
        hidden={hideToolbar}
        items={[
          {
            onPress: () => () => {
              const isActive = activeKeyboard === ColorKeyboard.id;
              if (isActive) editor.focus();
              setActiveKeyboard(isActive ? undefined : ColorKeyboard.id);
            },
            active: () => activeKeyboard === ColorKeyboard.id,
            disabled: () => false,
            image: () => Images.platte,
          },
          ...DEFAULT_TOOLBAR_ITEMS,
        ]}
      />
    );
  };
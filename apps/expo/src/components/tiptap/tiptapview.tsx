// TipTapView.tsx
import {
  TipTapRender,
  NodeHandlers,
  NodeHandler,
} from "@troop.com/tiptap-react-render";
import SyntaxHighlighter from "./SyntaxHighligher";

const Doc: NodeHandler = ({ children }) => <>{children}</>;

const CodeblockNode: NodeHandler = ({ node }) => {
  if (!node.content) return <></>;

  const [{ text }] = node.content;

  return (
    <SyntaxHighlighter
      language={(node?.attrs?.language as string) ?? undefined}
      highlighter={"prism" || "hljs"}
    >
      {text}
    </SyntaxHighlighter>
  );
};

const TipTapView = ({
  node = {
    type: "doc",
  },
}) => {
  const handlers: NodeHandlers = {
    doc: Doc,
    codeBlock: CodeblockNode,
  };

  return <TipTapRender handlers={handlers} node={node} />;
};

export default TipTapView
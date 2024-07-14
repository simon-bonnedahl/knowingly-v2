
import { LinkPreview } from "~/components/link-preview";
import { DefaultReactSuggestionItem, createReactInlineContentSpec } from "@blocknote/react";
import { Badge } from "@knowingly/ui/badge";
import Link from "next/link";
import { PagePreview } from "~/components/page-preview";

 
// The Mention inline content.
export const BlocknoteMention = createReactInlineContentSpec(
  {
    type: "mention",
    propSchema: {
      user: {
        default: "Unknown",
      },
      href: {
        type: "string",
        default: "#",
      },
    },
    content: "none",
  },
  {
    render: (props) => (
      <PagePreview url={props.inlineContent.props.href}>
        <Badge variant="outline" className="text-sm">@ {props.inlineContent.props.user}</Badge>
      </PagePreview>
    ),
  }
);


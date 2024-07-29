
import { createReactInlineContentSpec } from "@blocknote/react";
import { Badge } from "@knowingly/ui/badge";
import { PagePreview } from "~/components/page-preview";

 
// The Mention inline content.
export const BlocknoteMention = createReactInlineContentSpec(
  {
    type: "mention",
    propSchema: {
      user: {
        type: "string",
        default: "Unknown",
      },
      image: {
        type: "string",
        default: "",
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
      <PagePreview url={props.inlineContent.props.href} name={props.inlineContent.props.user} image={props.inlineContent.props.image}>
        <Badge variant="outline" className="text-sm">@ {props.inlineContent.props.user}</Badge>
      </PagePreview>
    ),
  }
);


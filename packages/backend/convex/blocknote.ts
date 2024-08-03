type TextContent = {
  type: 'text';
  text: string;
  styles?: {
    bold?: boolean;
    italic?: boolean;
  };
};

type Block = {
  id: string;
  type: 'heading' | 'paragraph' | 'bulletListItem';
  props: {
    textColor: string;
    backgroundColor: string;
    textAlignment: string;
    level?: number;
  };
  content?: TextContent[]; // Make content optional
  children: Block[];
};

// Function to apply styles to text
function applyStyles(text: string, styles: { bold?: boolean; italic?: boolean } = {}): string {
  if (styles.bold) text = `**${text}**`;
  if (styles.italic) text = `_${text}_`;
  return text;
}

// Function to convert a single block to Markdown
function convertBlockToMarkdown(block: Block): string {
  const { type, props, content } = block;
  let markdown = '';

  switch (type) {
    case 'heading':
      const level = props.level ?? 1;
      markdown += `${'#'.repeat(level)} `;
      break;
    case 'bulletListItem':
      markdown += '- ';
      break;
    // No specific prefix for paragraphs
  }

  // Check if content is defined and an array, then process
  if (Array.isArray(content)) {
    markdown += content.map((item) => applyStyles(item.text, item.styles || {})).join(' ') + '  '; // Add two spaces for line break
  }

  return markdown;
}



export const customContentToMarkdown = (content: string) => {
   const blocks = JSON.parse(content) as Block[];
    const markdown = blocks.map(convertBlockToMarkdown).join('\n\n');
    return markdown;
    
   
  }
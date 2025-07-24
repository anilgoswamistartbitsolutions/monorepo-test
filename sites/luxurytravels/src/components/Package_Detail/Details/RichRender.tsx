import React from "react";

function renderInlineText(children: any[]) {
  return children.map((child: any, i: number) => {
    if (child.type === "linebreak") {
      return <br key={i} />;
    }
    if (child.type === "text") {
      let textElement: any = child.text;

      if (child.format) {
        if (child.format === 1)
          textElement = <strong key={i}>{textElement}</strong>;
        else if (child.format === 2)
          textElement = <em key={i}>{textElement}</em>;
        else if (child.format === 3)
          textElement = <u key={i}>{textElement}</u>;
      }

      return <React.Fragment key={i}>{textElement}</React.Fragment>;
    }

    return null;
  });
}

function splitParagraphChildren(children: any[]): any[][] {
  const groups: any[][] = [];
  let currentGroup: any[] = [];

  children.forEach((child: any) => {
    if (child.type === "horizontalrule") {
      if (currentGroup.length > 0) {
        groups.push(currentGroup);
        currentGroup = [];
      }
      groups.push([child]);
    } else {
      currentGroup.push(child);
    }
  });

  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  return groups;
}

function renderNode(node: any, index?: number): any {
  if (!node) return null;

  if (node.type === "root") {
    return node.children?.map((child: any, i: number) => renderNode(child, i));
  }

  if (node.type === "horizontalrule") {
    return <hr key={index} />;
  }

  if (node.type === "linebreak") {
    return <br key={index} />;
  }

  if (node.type === "quote") {
    return (
      <blockquote key={index}>
        {node.children?.map((child: any, i: number) => renderNode(child, i))}
      </blockquote>
    );
  }

  if (node.type === "heading") {
    const Tag = node.tag || "h2";
    return (
      <Tag key={index}>
        {node.children ? renderInlineText(node.children) : null}
      </Tag>
    );
  }

  if (node.type === "paragraph") {
    const groups = splitParagraphChildren(node.children || []);
    return groups.map((group: any[], i: number) => {
      if (group.length === 1 && group[0].type === "horizontalrule") {
        return <hr key={`hr-${index}-${i}`} />;
      }
      return <p key={`p-${index}-${i}`}>{renderInlineText(group)}</p>;
    });
  }

  if (node.children) {
    return node.children.map((child: any, i: number) => renderNode(child, i));
  }

  return null;
}

export default function RichTextRenderer({ content }: { content: any }) {
  if (!content || !content.root) return null;

  return <div>{renderNode(content.root)}</div>;
}

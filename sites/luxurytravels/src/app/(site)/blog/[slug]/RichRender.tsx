import React from "react";

function renderInlineText(children) {
  return children.map((child, i) => {
    if (child.type === "linebreak") {
      return <br key={i} />;
    }
    if (child.type === "text") {
      let textElement = child.text;

      if (child.format) {
        // Example format mapping — customize as needed
        if (child.format === 1) textElement = <strong key={i}>{textElement}</strong>;
        else if (child.format === 2) textElement = <em key={i}>{textElement}</em>;
        else if (child.format === 3) textElement = <u key={i}>{textElement}</u>;
      }

      return <React.Fragment key={i}>{textElement}</React.Fragment>;
    }

    return null;
  });
}

// Helper to split paragraph children by horizontalrule
function splitParagraphChildren(children) {
  const groups = [];
  let currentGroup = [];

  children.forEach((child) => {
    if (child.type === "horizontalrule") {
      if (currentGroup.length > 0) {
        groups.push(currentGroup);
        currentGroup = [];
      }
      groups.push([child]); // hr as a separate group
    } else {
      currentGroup.push(child);
    }
  });

  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  return groups;
}

function renderNode(node, index) {
  if (!node) return null;

  if (node.type === "root") {
    return node.children?.map(renderNode);
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
        {node.children?.map((child, i) => renderNode(child, i))}
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
    // Split paragraph children to separate <hr> outside <p>
    const groups = splitParagraphChildren(node.children || []);
    return groups.map((group, i) => {
      if (group.length === 1 && group[0].type === "horizontalrule") {
        return <hr key={`hr-${index}-${i}`} />;
      }
      return (
        <p key={`p-${index}-${i}`}>
          {renderInlineText(group)}
        </p>
      );
    });
  }

  if (node.children) {
    return node.children.map(renderNode);
  }

  return null;
}

export default function RichTextRenderer({ content }) {
  if (!content || !content.root) return null;

  return <div>{renderNode(content.root)}</div>;
}

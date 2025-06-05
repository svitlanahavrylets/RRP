import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Placeholder from "@tiptap/extension-placeholder";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Youtube from "@tiptap/extension-youtube";

export const useDefaultEditor = () =>
  useEditor({
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
      TextStyle.configure({ mergeNestedSpanStyles: true }),
      Color,
      FontFamily,
      Placeholder.configure({
        emptyEditorClass: "is-editor-empty",
        emptyNodeClass: "my-custom-is-empty-class",
        placeholder: "Zadejte text...",
      }),
      HorizontalRule.configure({
        HTMLAttributes: {
          class: "my-custom-hr-class",
          style: "border: none; border-top: 2px solid #ccc; margin: 20px 0;",
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "my-custom-image",
        },
      }),
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
      Table.configure({
        resizable: true,
        allowColumnResizing: true,
        allowTableNodeSelection: true,
        style: "border-collapse: collapse; width: 100%;",
        class: "my-custom-table",
      }),
      TableRow.configure({
        HTMLAttributes: {
          style: `border: 1px solid #ccc;`,
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          style:
            "border: 1px solid #ccc; padding: 8px; background-color: #f0f0f0; color: #1a365b; text-align: left;",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          style: "border: 1px solid #ccc; padding: 8px;",
        },
      }),
      TaskList.configure({ itemTypeName: "taskItem" }),
      TaskItem.configure({
        HTMLAttributes: {
          class: "my-custom-class",
        },
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        style:
          "min-height: 200px; padding: 10px; margin: 0; outline: none; list-style-type: disc;",
      },
    },
  });

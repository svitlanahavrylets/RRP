import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Placeholder from "@tiptap/extension-placeholder";

export const useDefaultEditor = () =>
  useEditor({
    extensions: [
      StarterKit,
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
    ],
    content: "",
    editorProps: {
      attributes: {
        style:
          "min-height: 200px; padding: 10px; margin: 0; outline: none; list-style-type: disc;",
      },
    },
  });

import { useEffect } from "react";
import { useFormikContext, ErrorMessage } from "formik";
import { EditorContent } from "@tiptap/react";
import styles from "./TiptapComponent.module.css";
import MenuBar from "../TiptapMenuBarComponent/TiptapMenuBarComponent.jsx"; // Підключаємо панель кнопок

const TiptapComponent = ({ editor }) => {
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      editor.commands.removeEmptyTextStyle();

      let html = editor.getHTML();

      // Заміняємо порожні абзаци на &nbsp;
      html = html.replace(/<p><\/p>/g, "<p>&nbsp;</p>");

      setFieldValue("description", html);
    };

    // Відслідковуємо оновлення в редакторі
    editor.on("update", handleUpdate);

    // Очищаємо слухачів при демонтажі компонента
    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor, setFieldValue]);

  return editor ? (
    <>
      <label className={styles.label}>Popis</label>

      {/* Панель кнопок */}
      <MenuBar editor={editor} />

      {/* Поле редактора */}
      <div className={styles.editorWrapper}>
        <EditorContent editor={editor} className={styles.editor} />
      </div>

      <ErrorMessage
        name="description"
        component="div"
        className={styles.error}
      />
    </>
  ) : null;
};

export default TiptapComponent;

import styles from "./TiptapMenuBarComponent.module.css";
import clsx from "clsx";
import { useCallback, useState } from "react";

const MenuBar = ({ editor }) => {
  const [height, setHeight] = useState(480);
  const [width, setWidth] = useState(640);

  const addImage = useCallback(() => {
    const url = window.prompt("Вставте URL зображення:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt(width, 10)) || 640,
        height: Math.max(180, parseInt(height, 10)) || 480,
      });
    }
  };

  return (
    <div className={styles.controlGroup}>
      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={clsx(styles.button, {
            [styles.isActive]: editor.isActive("heading", { level: 1 }),
          })}
        >
          H1
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={clsx(styles.button, {
            [styles.isActive]: editor.isActive("heading", { level: 2 }),
          })}
        >
          H2
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={clsx(styles.button, {
            [styles.isActive]: editor.isActive("heading", { level: 3 }),
          })}
        >
          H3
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={clsx(styles.button, {
            [styles.isActive]: editor.isActive("paragraph"),
          })}
        >
          Paragraph
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={clsx(styles.button, {
            [styles.isActive]: editor.isActive("bold"),
          })}
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={clsx(styles.button, {
            [styles.isActive]: editor.isActive("italic"),
          })}
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={clsx(styles.button, {
            [styles.isActive]: editor.isActive("strike"),
          })}
        >
          Strike
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={clsx(styles.button, {
            [styles.isActive]: editor.isActive("highlight"),
          })}
        >
          Highlight
        </button>

        <select
          className={styles.option}
          onChange={(e) =>
            editor.chain().focus().setFontFamily(e.target.value).run()
          }
          defaultValue=""
        >
          <option value="" disabled>
            Vyberte písmo
          </option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Verdana">Verdana</option>
        </select>


        <button
          type="button"
          onClick={() => editor.chain().focus().unsetFontFamily().run()}
          className={styles.button}
        >
          Vymazat písmo
        </button>

        {["left", "center", "right", "justify"].map((align) => (
          <button
            key={align}
            type="button"
            onClick={() => editor.chain().focus().setTextAlign(align).run()}
            className={clsx(styles.button, {
              [styles.isActive]: editor.isActive({ textAlign: align }),
            })}
          >
            {align.charAt(0).toUpperCase() + align.slice(1)}
          </button>
        ))}

        {[
          { color: "#D6B65A", label: "gold" },
          { color: "#686F73", label: "grey" },
          { color: "#000000", label: "black" },
        ].map(({ color, label }) => (
          <button
            key={color}
            type="button"
            onClick={() => editor.chain().focus().setColor(color).run()}
            className={styles.button}
          >
            <span style={{ color }}>{label}</span>
          </button>
        ))}

        <button
          type="button"
          onClick={() => editor.chain().focus().unsetColor().run()}
          className={styles.button}
        >
          Vymazat barvu
        </button>

        {/* <button
          type="button"
          onClick={() => editor.chain().focus().toggleList("bulletList").run()}
          className={clsx(styles.button, {
            [styles.isActive]: editor.isActive("bulletList"),
          })}
        >
          Bullet List
        </button> */}

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={clsx(styles.button, {
            [styles.isActive]: editor.isActive("orderedList"),
          })}
        >
          Ordered List
        </button>

        <div className={styles.youTubeWrapper}>
          <input
            id="width"
            type="number"
            min="320"
            max="1024"
            placeholder="width"
            value={width}
            onChange={(event) => setWidth(event.target.value)}
            className={styles.optionYouTube}
          />
          <input
            id="height"
            type="number"
            min="180"
            max="720"
            placeholder="height"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            className={styles.optionYouTube}
          />
          <button id="add" onClick={addYoutubeVideo}>
            Add YouTube video
          </button>
        </div>

        <button type="button" onClick={addImage} className={styles.button}>
          Insert Image
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={styles.button}
        >
          Horizontal Rule
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          className={styles.button}
        >
          Insert Table
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          className={styles.button}
        >
          Add Column Before
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          className={styles.button}
        >
          Add Column After
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().deleteColumn().run()}
          className={styles.button}
        >
          Delete Column
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().addRowBefore().run()}
          className={styles.button}
        >
          Add Row Before

        </button>

        <button
          type="button"

          onClick={() => editor.chain().focus().addRowAfter().run()}
          className={styles.button}

        >
          Add Row After
        </button>

        <button
          type="button"

        >
          Delete Row
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().deleteTable().run()}
          className={styles.button}
        >
          Delete Table
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={clsx(styles.button, {
            [styles.isActive]: editor.isActive("taskList"),
          })}
        >
          Toggle Task List
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().splitListItem("taskItem").run()}
          disabled={!editor.can().splitListItem("taskItem")}
          className={styles.button}
        >
          Split List Item
        </button>
      </div>
    </div>
  );
};

export default MenuBar;

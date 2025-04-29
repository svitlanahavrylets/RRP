import styles from "./TiptapMenuBarComponent.module.css";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

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

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleList("bulletList").run()}
          className={clsx(styles.button, {
            [styles.isActive]: editor.isActive("bulletList"),
          })}
        >
          Bullet List
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={clsx(styles.button, {
            [styles.isActive]: editor.isActive("orderedList"),
          })}
        >
          Ordered List
        </button>
      </div>
    </div>
  );
};

export default MenuBar;

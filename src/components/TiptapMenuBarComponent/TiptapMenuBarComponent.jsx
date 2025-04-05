import styles from "./TiptapMenuBarComponent.module.css";
// import { Heading1, Heading2, Heading3 } from "shadcn";
// import { Toggle } from "@/components/ui/toggle";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }
  //   const options = [
  //     {
  //       icon: <Heading1 className="size-4" />,
  //       onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  //       pressed: editor.isActive("heading", { level: 1 }),
  //     },
  //     {
  //       icon: <Heading2 className="size-4" />,
  //       onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  //       pressed: editor.isActive("heading", { level: 2 }),
  //     },
  //     {
  //       icon: <Heading3 className="size-4" />,
  //       onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
  //       pressed: editor.isActive("heading", { level: 3 }),
  //     },
  //     {
  //       icon: <p className="size-4">P</p>, // Якщо для paragraph є окремий компонент
  //       onClick: () => editor.chain().focus().setParagraph().run(),
  //       pressed: editor.isActive("paragraph"),
  //     },
  //     {
  //       icon: <b className="size-4">B</b>, // Bold
  //       onClick: () => editor.chain().focus().toggleBold().run(),
  //       pressed: editor.isActive("bold"),
  //     },
  //     {
  //       icon: <i className="size-4">I</i>, // Italic
  //       onClick: () => editor.chain().focus().toggleItalic().run(),
  //       pressed: editor.isActive("italic"),
  //     },
  //     {
  //       icon: <del className="size-4">S</del>, // Strike
  //       onClick: () => editor.chain().focus().toggleStrike().run(),
  //       pressed: editor.isActive("strike"),
  //     },
  //     {
  //       icon: <mark className="size-4">H</mark>, // Highlight (маркування)
  //       onClick: () => editor.chain().focus().toggleMark("highlight").run(),
  //       pressed: editor.isActive("highlight"),
  //     },
  //     {
  //       icon: <div className="align-left">L</div>, // Align left
  //       onClick: () => editor.chain().focus().setTextAlign("left").run(),
  //       pressed: editor.isActive("align", { textAlign: "left" }),
  //     },
  //     {
  //       icon: <div className="align-center">C</div>, // Align center
  //       onClick: () => editor.chain().focus().setTextAlign("center").run(),
  //       pressed: editor.isActive("align", { textAlign: "center" }),
  //     },
  //     {
  //       icon: <div className="align-right">R</div>, // Align right
  //       onClick: () => editor.chain().focus().setTextAlign("right").run(),
  //       pressed: editor.isActive("align", { textAlign: "right" }),
  //     },
  //     {
  //       icon: <div className="align-justify">J</div>, // Align justify
  //       onClick: () => editor.chain().focus().setTextAlign("justify").run(),
  //       pressed: editor.isActive("align", { textAlign: "justify" }),
  //     },
  //   ];

  return (
    <div className={styles.controlGroup}>
      <div className={styles.buttonGroup}>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          Paragraph
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          Strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={editor.isActive("highlight") ? "is-active" : ""}
        >
          Highlight
        </button>
        <select
          className={styles.option}
          onChange={(e) => {
            editor.chain().focus().setFontFamily(e.target.value).run();
          }}
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
        <button onClick={() => editor.chain().focus().unsetFontFamily().run()}>
          Vymazat písmo
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        >
          Left
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? "is-active" : ""
          }
        >
          Center
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        >
          Right
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={
            editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
          }
        >
          Justify
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#D6B65A").run()}
        >
          <span style={{ color: "#D6B65A" }}>gold</span>
        </button>

        <button
          onClick={() => editor.chain().focus().setColor("#686F73").run()}
        >
          <span style={{ color: "#686F73" }}>grey</span>
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#000000").run()}
        >
          <span style={{ color: "#000000" }}>black</span>
        </button>

        <button onClick={() => editor.chain().focus().unsetColor().run()}>
          Vymazat barvu
        </button>
        <button
          onClick={() => editor.chain().focus().toggleList("bulletList").run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          Ordered List
        </button>
      </div>
    </div>
    // <div className={styles.iconWrapper}>
    //   {" "}
    //   {options.map((option, index) => (
    //     <Toggle key={index} pressed={true}>
    //       {option.icon}
    //     </Toggle>
    //   ))}
    // </div>
  );
};

export default MenuBar;

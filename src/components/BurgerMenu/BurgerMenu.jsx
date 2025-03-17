import { useState, useEffect } from "react";
import Navigation from "./Navigation"; // імпорт твого компонента навігації
import { X, Menu } from "lucide-react"; // Іконки для бургер-меню
import "./BurgerMenu.css"; // Підключаємо стилі

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Функція для перемикання стану меню
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Блокуємо скрол сторінки, коли меню відкрите
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Кнопка бургер-меню */}
      <button className="burger-button" onClick={toggleMenu}>
        <Menu size={32} />
      </button>

      {/* Меню на весь екран */}
      {isOpen && (
        <div className="burger-menu">
          <button className="close-button" onClick={toggleMenu}>
            <X size={32} />
          </button>
          <Navigation />
        </div>
      )}
    </>
  );
};

export default BurgerMenu;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../api/auth/auth.js"; // Імпорт запиту

import style from "./AdminLogin.module.css";
import iziToast from "izitoast";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginAdmin(password);
      localStorage.setItem("adminToken", data.token);
      iziToast.success({
        title: "Success",
        message: "You have successfully logged in!",
        position: "topRight", // Можеш вибрати будь-яке зручне місце
      });
      navigate("/admin/dashboard"); // Переходимо в адмінку
    } catch (errorMessage) {
      iziToast.error({
        title: "Login Error",
        message: errorMessage, // Виводимо помилку
        position: "topRight",
      });
    }
  };

  return (
    // <div className={style.adminContainer}>
    //   <h2 className={style.title}>Přihlášení do administrace</h2>
    //   <div className={style.inputWrapper}>
    //     <input
    //       type="password"
    //       placeholder="Zadejte heslo"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <button onClick={handleLogin}>Přihlásit se</button>
    //     {error && <p style={{ color: "red" }}>{error}</p>}
    //   </div>
    // </div>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
      className={style.adminContainer}
    >
      <h2 className={style.title}>Přihlášení do administrace</h2>
      <div className={style.inputWrapper}>
        <input
          type="password"
          placeholder="Zadejte heslo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Přihlásit se</button>
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      </div>
    </form>
  );
};

export default AdminLogin;

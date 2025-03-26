import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../../api/auth/auth.js"; // Імпорт запиту

import style from "./AdminLogin.module.css";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginAdmin(password);
      localStorage.setItem("adminToken", data.token);
      navigate("/admin/dashboard"); // Переходимо в адмінку
    } catch (errorMessage) {
      setError(errorMessage);
    }
  };

  return (
    <div className={style.adminContainer}>
      <h2 className={style.title}>Přihlášení do administrace</h2>
      <div className={style.inputWrapper}>
        <input
          type="password"
          placeholder="Zadejte heslo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Přihlásit se</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;

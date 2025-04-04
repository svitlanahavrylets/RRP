import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../api/auth/auth.js"; // Імпорт запиту
import { BiShow, BiHide } from "react-icons/bi";

import style from "./AdminLogin.module.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginAdmin(password);
      localStorage.setItem("adminToken", data.token);
      iziToast.success({
        title: "Success",
        message: "You have successfully logged in!",
        position: "topRight",
      });

      navigate("/admin/dashboard");
    } catch (error) {
      console.log("CATCH BLOCK RUNNING");
      console.log("Error:", error);
      const errorMessage = error.message || "Chyba při přihlášení";
      setError("Nesprávné heslo! Zkuste to znovu.");

      iziToast.error({
        title: "Login Error",
        message: errorMessage,
        position: "topRight",
        timeout: 5000,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
        <div className={style.inputContainer}>
          <input
            type={showPassword ? "text" : "password"} // 👁️
            placeholder="Zadejte heslo"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
            onFocus={() => {
              if (error) setError("");
            }}
            className={style.logInPass}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={style.eyeButton}
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <BiShow className={style.eye} />
            ) : (
              <BiHide className={style.eye} />
            )}
          </button>
        </div>
        <button className={style.logInBtn} type="submit">
          Přihlásit se
        </button>
        {error && (
          <p
            className={style.logInErrorText}
            style={{ color: "red", marginTop: "10px" }}
          >
            {error}
          </p>
        )}
        {/* Відображення помилки */}
      </div>
    </form>
  );
};

export default AdminLogin;

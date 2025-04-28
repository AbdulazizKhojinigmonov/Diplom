import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../store/authSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Login.css";
import "../../App.css";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    username: Yup.string().required("Обязательно"),
    password: Yup.string().required("Обязательно"),
  });

  const handleSubmit = (values: { username: string; password: string }) => {
    try {
      const savedUser = localStorage.getItem("user");

      if (!savedUser) {
        alert("Пользователь не зарегистрирован!");
        return;
      }

      const parsedUser = JSON.parse(savedUser);

      if (parsedUser.username === values.username && parsedUser.password === values.password) {
        dispatch(login(parsedUser));
        navigate("/");
      } else {
        alert("Неверный логин или пароль!");
      }
    } catch (error) {
      console.error("Ошибка логина:", error);
      alert("Произошла ошибка при входе.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Вход в аккаунт</h2>
        <p className="login-subtitle">Введите данные для входа в систему</p>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="login-form">
              <div className="form-group">
                <label htmlFor="username" className="form-label">Имя пользователя</label>
                <Field id="username" name="username" type="text" className="form-input" />
                <ErrorMessage name="username" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Пароль</label>
                <Field id="password" name="password" type="password" className="form-input" />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>

              <button type="submit" disabled={isSubmitting} className="login-button">
                Войти
              </button>
            </Form>
          )}
        </Formik>

        <div className="register-link-container">
          <p>Нет аккаунта? <Link to="/register" className="register-link">Зарегистрироваться</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

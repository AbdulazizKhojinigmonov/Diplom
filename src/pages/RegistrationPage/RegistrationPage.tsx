import React from "react";
import { useDispatch } from "react-redux";
import { register } from "../../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Register.css";

const RegistrationPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registrationSchema = Yup.object().shape({
    username: Yup.string().min(3, "Минимум 3 символа").required("Обязательно"),
    password: Yup.string().min(6, "Минимум 6 символов").required("Обязательно"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Пароли должны совпадать")
      .required("Обязательно"),
  });

  const handleSubmit = (values: { username: string; password: string }) => {
    try {
      // Проверка на существующего пользователя в localStorage
      const existingUser = localStorage.getItem("user");
      if (existingUser) {
        alert("Пользователь с таким именем уже существует!");
        return;
      }

      // Регистрируем нового пользователя
      const newUser = { username: values.username, password: values.password };
      dispatch(register(newUser));
      localStorage.setItem("user", JSON.stringify(newUser));  // Сохраняем пользователя в localStorage
      localStorage.setItem("isAuthenticated", "true");  // Ставим статус аутентификации
      alert("Регистрация успешна!"); // Уведомление об успешной регистрации

      navigate("/login");  // Переход на страницу входа
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      alert("Произошла ошибка при регистрации.");
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-box">
        <div className="registration-header">
          <h1>Регистрация</h1>
        </div>

        <Formik
          initialValues={{ username: "", password: "", confirmPassword: "" }}
          validationSchema={registrationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="registration-form">
              <div className="form-group">
                <label>Имя пользователя</label>
                <Field
                  name="username"
                  type="text"
                  className="input-field"
                  placeholder="Введите имя пользователя"
                />
                <ErrorMessage name="username" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label>Пароль</label>
                <Field
                  name="password"
                  type="password"
                  className="input-field"
                  placeholder="Введите пароль"
                />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label>Подтвердите пароль</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className="input-field"
                  placeholder="Подтвердите пароль"
                />
                <ErrorMessage name="confirmPassword" component="div" className="error-message" />
              </div>

              <button type="submit" disabled={isSubmitting} className="submit-button">
                {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
              </button>

              <div className="login-link">
                Уже есть аккаунт? <Link to="/login">Войти</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationPage;

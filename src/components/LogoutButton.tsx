import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // После выхода отправляем на страницу логина
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Выйти
    </button>
  );
};

export default LogoutButton;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "./Main.css";
import Logo from "../../assets/logo.svg";
import Home1 from "../../assets/home1.webp";
import Home2 from "../../assets/home2.webp";
import Home3 from "../../assets/home3.webp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Импортируем useSelector для доступа к состоянию
import { logout } from "../../store/authSlice";
import SearchBox from "../../components/SearchBox"; 

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated); // Получаем статус аутентификации

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');  // Перенаправляем на страницу входа
  };

  return (
    <header className="header-gradient">
      <div className="container">
        <img src={Logo} alt="" width={100} height={30} />
        <nav>
          <ul className="nav-menu">
            <li><a href="#about" className="nav-link">О нас</a></li>
            <li><a href="#services" className="nav-link">Услуги</a></li>
            <li><a href="#contacts" className="nav-link">Контакты</a></li>
            {isAuthenticated ? (
              <li><button onClick={handleLogout} className="nav-link logout-btn">Log Out</button></li>
            ) : (
              <li><a href="/login" className="nav-link">Войти</a></li> // Переход на страницу логина, если не авторизован
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

const Landing: React.FC = () => {
  return (
    <section className="hero-section fade-in" id="about">
      <div className="container">
        <h2 className="hero-title">Найдем лучший дом для вас</h2>
        <p className="hero-subtitle">Мы поможем вам купить, продать или арендовать недвижимость.</p>
        <SearchBox />
      </div>
    </section>
  );
};

const Slider: React.FC = () => {
  return (
    <section className="properties-section" id="services">
      <div className="container">
        <h2 className="section-title">Популярные предложения</h2>
        <Swiper 
          navigation={true} 
          modules={[Navigation]} 
          className="properties-slider"
        >
          <SwiperSlide>
            <div className="property-card">
              <img src={Home1} alt="Квартира в центре" className="property-image" />
              <h3 className="property-title">Квартира в центре</h3>
              <p className="property-details">2 комнаты, 70м², $120,000</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="property-card">
              <img src={Home2} alt="Дом у озера" className="property-image" />
              <h3 className="property-title">Дом у озера</h3>
              <p className="property-details">3 комнаты, 120м², $250,000</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="property-card">
              <img src={Home3} alt="Люкс апартаменты" className="property-image" />
              <h3 className="property-title">Люкс апартаменты</h3>
              <p className="property-details">4 комнаты, 200м², $500,000</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className="main-page">
      <Header />
      <Landing />
      <Slider />
    </div>
  );
};

export default HomePage;

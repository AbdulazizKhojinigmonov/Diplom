import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import MainPage from './pages/MainPage/MainPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import CardPage from './pages/CardPage/CardPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage/PropertyDetailsPage'; 
import PrivateRoute from './components/PrivateRoute';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/" element={<PrivateRoute><MainPage /></PrivateRoute>} />
        <Route path="/favorites" element={<PrivateRoute><FavoritesPage /></PrivateRoute>} />
        <Route path="/card" element={<PrivateRoute><CardPage /></PrivateRoute>} />
        <Route path="/property/:id" element={<PrivateRoute><PropertyDetailsPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Kasir from './pages/Kasir';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Manajer from './pages/Manajer';
// import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/kasir" element={<Kasir />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/manajer" element={<Manajer />} />
      </Routes>
    </BrowserRouter>
  );
}

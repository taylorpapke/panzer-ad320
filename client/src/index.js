import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css';
import Welcome from './components/Welcome/Welcome'
import App from './App';
import Topbar from './components/Topbar/Topbar';
import reportWebVitals from './reportWebVitals';
import Login from './components/Login/Login'
import Register from './components/Register/Register'


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Topbar createMode={false} createCardHandler={() => { console.log("things") }} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

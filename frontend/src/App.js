import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from './AuthPage';
import Profile from './Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;

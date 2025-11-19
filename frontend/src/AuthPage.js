// src/AuthPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AuthPage.css"

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    const API_URL = "http://user.local/api";
    const url = isLogin 
      ? `${API_URL}/auth/login`
      : `${API_URL}/auth/register`;

    const bodyData = isLogin
      ? { username: formData.username, password: formData.password }
      : { username: formData.username, email: formData.email, password: formData.password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin && data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', formData.username); // stocke le username
        }
        alert(`${isLogin ? 'Connexion' : 'Inscription'} réussie !`);
        navigate('/profile'); // redirige vers la page profile
      } else {
        alert(data.message || 'Erreur lors de la requête');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Impossible de contacter le serveur');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="simple-form">
      <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
      
      <input
        type="text"
        name="username"
        placeholder="Nom d'utilisateur"
        value={formData.username}
        onChange={handleChange}
        required
      />

      {!isLogin && (
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      )}

      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        value={formData.password}
        onChange={handleChange}
        required
      />

      {!isLogin && (
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmer le mot de passe"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      )}

      <button type="submit">
        {isLogin ? 'Se connecter' : "S'inscrire"}
      </button>

      <p>
        {isLogin ? 'Pas de compte ?' : 'Déjà un compte ?'}
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "S'inscrire" : 'Se connecter'}
        </button>
      </p>
    </form>
  );
}

export default AuthPage;

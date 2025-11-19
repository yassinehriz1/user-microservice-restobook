// src/Profile.js
import React, { useEffect, useState } from 'react';

function Profile() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Récupère le username depuis le localStorage ou token décodé
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || '');
  }, []);

  return (
    <div>
      <h2>Profil de l'utilisateur</h2>
      {username ? <p>Bonjour, {username} !</p> : <p>Utilisateur non connecté.</p>}
    </div>
  );
}

export default Profile;

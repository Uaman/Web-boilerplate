import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/auth';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();
  const validUser = 'mark5';


  if (username === validUser && password === validUser) {
    console.log('Успішний вхід');
    login(username);
    navigate('/dashboard');
  } else {
    console.log('Невірний логін або пароль');
    setError('Невірний логін або пароль');
  }
};


  return (
    <div className="input-wrapper">
      <h2 className="enter-text">Login to Web App</h2>
      <form onSubmit={handleSubmit}>
      <label className="above-enter">E-mail:</label>
        <input
          type="text"
          placeholder="Логін"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="above-enter">Password:</label>
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="submit-btn" type="submit">Увійти</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;

import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('http://challenge-react.alkemy.org/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Error en la autenticación');
      }

      const data = await response.json();

      // Almacena el token en el contexto o donde sea necesario
      console.log('Token:', data.token);

      // Redirige al Home (puedes utilizar React Router para esto)
    } catch (error) {
      alert('Error al intentar iniciar sesión. Por favor, verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      <h1>Formulario de Login</h1>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label style={{ margin: '10px 0' }}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '8px', marginTop: '5px' }}
          />
        </label>
        <br />
        <label style={{ margin: '10px 0' }}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '8px', marginTop: '5px' }}
          />
        </label>
        <br />
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            padding: '10px',
            marginTop: '10px',
            backgroundColor: loading ? '#ccc' : '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Procesando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from 'react';
import { ValidateEmail } from '../helper/emailValidate';

function Login() {
  const [infoValidation, setInfoValidation] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputs = ({ target }) => {
    if (target.name === 'email') {
      setEmail(target.value);
    } else {
      setPassword(target.value);
    }
  };

  const minLengthPassword = 7;

  useEffect(() => {
    if ((email.length > 0 && ValidateEmail(email))
    && password.length >= minLengthPassword) {
      setInfoValidation(true);
    } else {
      setInfoValidation(false);
    }
  }, [email, password]);

  const handleEnter = () => {
    const saveEmail = { email };
    localStorage.setItem('user', JSON.stringify(saveEmail));
  };

  return (
    <div>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        data-testid="email-input"
        onChange={ handleInputs }
        value={ email }
        name="email"
        id="email"
      />

      <label htmlFor="password">Senha:</label>
      <input
        type="password"
        data-testid="password-input"
        onChange={ handleInputs }
        value={ password }
        name="password"
        id="password"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !infoValidation }
        onClick={ handleEnter }
      >
        Enter

      </button>
    </div>
  );
}

export default Login;

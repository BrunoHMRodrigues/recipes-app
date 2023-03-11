import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ValidateEmail } from '../helper/emailValidate';
import tomato from '../images/tomate.png';
// import loginBackground from '../images/loginBackground.png';
import logoRecipesApp from '../images/logoRecipesApp.png';
import './Login.css';

function Login() {
  const [infoValidation, setInfoValidation] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

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
    history.push('/meals');
  };

  return (
    <div className="container-login-page app-container pb-5">
      <div className="container-background-login">
        <img src={ logoRecipesApp } alt="Logo Recipes" className="logo-login" />
        <img src={ tomato } alt="Tomatoes" className="image-tomatoes" />
      </div>

      <form className="container-login-form">
        <h1>LOGIN</h1>
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
      </form>
    </div>
  );
}

export default Login;

import React from "react"
import useFormWithValidation from '../hooks/useFormWithValidation.jsx';

function Login({ handleLogin, unsuccessfulRegister }) {
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    handleLogin(values.email, values.password)
  }


  return (
    <div className="register">
      <h2 className="register__title">Вход</h2>
      <form onSubmit={handleSubmit} name="form_register" className="form register__content">
        <label className="register__label">
          <input className="register__input" type="email" placeholder="Email" name="email" value={values.email || ''} onChange={handleChange} />
          <span className="register__error" id="email-error">
            {errors.email || ''}
          </span>
        </label>
        <label className="register__label">
          <input className="register__input" minLength={8} type="password" placeholder="пароль" name="password" value={values.password || ''} onChange={handleChange} />
          <span className="register__error" id="password-error">
            {errors.password || ''}
          </span>
        </label>
        <button type="submit" className="register__button">Войти</button>
      </form>
    </div>
  );
}

export default Login;
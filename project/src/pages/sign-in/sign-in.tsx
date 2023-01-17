import {LogInError} from '../../types/LogInError';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import React, {useMemo, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {login} from '../../store/api-action';
import {Navigate} from 'react-router-dom';
import {AuthStatus} from '../../types/AuthStatus';
import {getAuthStatus, getLoginError} from '../../store/auth-process/selectors';
import {setLoginError} from '../../store/auth-process/auth-process';

function SignIn(): JSX.Element{

  const authorizationStatus = useAppSelector(getAuthStatus);
  const loginError = useAppSelector(getLoginError);
  const dispatch = useAppDispatch();

  const renderErrorMessage = (logInError: LogInError) => {
    switch (logInError) {
      case LogInError.NotValidEmail:
        return (
          <div className="sign-in__message">
            <p>Please enter a valid email address</p>
          </div>
        );
      case LogInError.NotValidPassword:
        return (
          <div className="sign-in__message">
            <p>Please enter a valid password.</p>
            <p>Password must contain at least one letter and one digit.</p>
          </div>
        );
      case LogInError.NotValidEmailAndPasswordCombination:
        return (
          <div className="sign-in__message">
            <p>We can’t recognize this email <br/> and password combination. Please try again.</p>
          </div>
        );
      default:
        return null;
    }
  };
  const errorMessage = useMemo(() => renderErrorMessage(loginError), [loginError]);

  const formRef = useRef(null);

  const isValidPassword = (password: string) => /[a-zA-Z]/.test(password) && /\d/.test(password);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formRef.current){
      const formData = new FormData(formRef.current);
      const email = formData.get('user-email');
      const password = formData.get('user-password');
      if (email === null || email === '') {
        dispatch(setLoginError(LogInError.NotValidEmail));
      } else if (password === null || password === '' || !isValidPassword(password.toString())) {
        dispatch(setLoginError(LogInError.NotValidPassword));
      } else {
        dispatch(login({email: email?.toString() || '', password: password?.toString() || ''}));
      }
    }
  };

  return (
    authorizationStatus === AuthStatus.Authorized ?
      <Navigate to={'/'}/> :
      <div className="user-page">

        <Header className='user-page__head'>
          <h1 className="page-title user-page__title">Sign in</h1>
        </Header>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" ref={formRef} onSubmit={handleSubmit}>

            {errorMessage}

            <div className="sign-in__fields">

              <div className="sign-in__field">
                <input className="sign-in__input" type="email" placeholder="Email address" name="user-email"
                  id="user-email"
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>

              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password" name="user-password"
                  id="user-password"
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>

            </div>

            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>

          </form>
        </div>

        <Footer/>
      </div>
  );
}

export default SignIn;

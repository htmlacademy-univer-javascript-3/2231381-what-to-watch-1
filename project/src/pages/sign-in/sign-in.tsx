import {LogInError} from '../../types/LogInError';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import React, {useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {login} from '../../services/api-action';
import {Navigate} from 'react-router-dom';
import {AuthStatus} from '../../types/AuthStatus';
import {setLoginError} from '../../store/action';

function SignIn(): JSX.Element{

  const {loginError, authorizationStatus} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  let errorMessage;
  switch (loginError) {
    case LogInError.NotValidEmail:
      errorMessage = (
        <div className="sign-in__message">
          <p>Please enter a valid email address</p>
        </div>);
      break;
    case LogInError.NotValidPassword:
      errorMessage = (
        <div className="sign-in__message">
          <p>Please enter a valid password</p>
        </div>);
      break;
    case LogInError.NotValidEmailAndPasswordCombination:
      errorMessage = (
        <div className="sign-in__message">
          <p>We can’t recognize this email <br/> and password combination. Please try again.</p>
        </div>);
      break;
    default:
      errorMessage = null;
  }

  const formRef = useRef(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formRef.current){
      const formData = new FormData(formRef.current);
      const email = formData.get('user-email');
      const password = formData.get('user-password');
      if (email === null || email === '') {
        dispatch(setLoginError(LogInError.NotValidEmail));
      } else if (password === null || password === '') {
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

import {LogInError} from '../../types/LogInError';
import Header from '../../components/header/header';
import {AuthStatus} from '../../types/AuthStatus';
import Footer from '../../components/footer/footer';

function SignIn({errorType} : {errorType? : LogInError}): JSX.Element{

  let errorMessage;
  switch (errorType) {
    case LogInError.NotValidEmail:
      errorMessage = (
        <div className="sign-in__message">
          <p>Please enter a valid email address</p>
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

  return (
    <div className="user-page">

      <Header isAuthorised={AuthStatus.OnSignInPage} className='user-page__head'>
        <h1 className="page-title user-page__title">Sign in</h1>
      </Header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form">

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

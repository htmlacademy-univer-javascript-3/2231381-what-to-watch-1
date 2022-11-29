import {AuthStatus} from '../../types/AuthStatus';
import {PropsWithChildren} from 'react';
import Logo from '../logo/logo';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks';

type HeaderProps = PropsWithChildren<{
  className: string;
}>

function UserBlock(){
  const {authorizationStatus, user} = useAppSelector((state) => state);

  const authorisedUserBlock = (
    <>
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src={user?.avatarUrl || ''} alt="User avatar" width="63" height="63"/>
        </div>
      </li>
      <li className="user-block__item">
        <Link to={AppRoute.Login} className="user-block__link">Sign out</Link>
      </li>
    </>);

  const notAuthorisedUserBlock = <Link to={AppRoute.Login} className="user-block__link">Sign in</Link>;

  let userBlock;
  switch (authorizationStatus) {
    case AuthStatus.Authorized:
      userBlock = authorisedUserBlock;
      break;
    case AuthStatus.NotAuthorized:
      userBlock = notAuthorisedUserBlock;
      break;
    case AuthStatus.OnSignInPage:
      userBlock = null;
      break;
  }

  return (<ul className='user-block'>{userBlock}</ul>);
}

function Header(props: HeaderProps) {

  return(
    <>
      <h1 className="visually-hidden">WTW</h1>
      <header className={`page-header ${props.className}`}>
        <Logo className='logo__link'/>

        {props.children}

        <UserBlock/>
      </header>
    </>
  );
}

export default Header;

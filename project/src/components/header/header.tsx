import {PropsWithChildren, useMemo} from 'react';
import Logo from '../logo/logo';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AuthStatus} from '../../types/AuthStatus';
import {logout} from '../../store/api-action';
import {getAuthStatus, getUser} from '../../store/auth-process/selectors';
import {redirectToRoute} from '../../store/action';

type HeaderProps = PropsWithChildren<{
  className: string;
}>

function UserBlock(){
  const user = useAppSelector(getUser);
  const authorizationStatus = useAppSelector(getAuthStatus);
  const dispatch = useAppDispatch();

  function getUserBlock(authStatus: AuthStatus) {
    switch (authStatus) {
      case AuthStatus.Authorized:
        return (
          <>
            <li className="user-block__item">
              <div className="user-block__avatar" onClick={() => {dispatch(redirectToRoute(AppRoute.MyList));}}>
                <img src={user?.avatarUrl || ''} alt="User avatar" width="63" height="63"/>
              </div>
            </li>
            <li className="user-block__item">
              <button onClick={() => {dispatch(logout());}}
                className="user-block__link"
                style={{background:'transparent', border:'none'}}
              >
                Sign out
              </button>
            </li>
          </>);
      case AuthStatus.NotAuthorized:
        return <Link to={AppRoute.Login} className="user-block__link">Sign in</Link>;
      case AuthStatus.Unknown:
        return null;
    }
  }
  const userBlock = useMemo(() => getUserBlock(authorizationStatus), [authorizationStatus]);

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

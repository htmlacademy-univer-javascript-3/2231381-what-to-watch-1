import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks';
import {AuthStatus} from '../../types/AuthStatus';
import {getAuthStatus} from '../../store/auth-process/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps) {
  const authorizationStatus = useAppSelector(getAuthStatus);

  return(
    authorizationStatus === AuthStatus.Authorized ?
      props.children :
      <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;

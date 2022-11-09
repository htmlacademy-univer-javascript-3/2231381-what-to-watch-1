import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {AuthStatus} from '../../types/AuthStatus';

type PrivateRouteProps = {
  isAuthorised: AuthStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps) {
  return(
    props.isAuthorised === AuthStatus.Authorized ?
      props.children :
      <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;

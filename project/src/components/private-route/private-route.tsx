import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {AuthStatus} from '../../types/AuthStatus';
import {useAppSelector} from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps) {
  const {authorizationStatus} = useAppSelector((state) => state);

  return(
    authorizationStatus === AuthStatus.Authorized ?
      props.children :
      <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;

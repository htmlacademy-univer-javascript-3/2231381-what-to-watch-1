import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks';
import {AuthStatus} from "../../types/AuthStatus";

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

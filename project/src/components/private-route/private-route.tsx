import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../const';

type PrivateRouteProps = {
  isAuthorised: boolean;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps) {
  return(
    props.isAuthorised ?
      props.children :
      <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;

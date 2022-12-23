import {State} from '../../types/state';
import {AuthStatus} from '../../types/AuthStatus';
import {StoreNameSpace} from '../../const';
import {User} from '../../types/User';
import {LogInError} from '../../types/LogInError';

export const getAuthStatus = (state: State): AuthStatus => state[StoreNameSpace.Auth].authorizationStatus;

export const getUser = (state: State): User | null => state[StoreNameSpace.Auth].user;

export const getLoginError = (state: State): LogInError => state[StoreNameSpace.Auth].loginError;

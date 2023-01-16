import {State} from '../../types/state';
import {AuthStatus} from '../../types/AuthStatus';
import {Namespace} from '../../const';
import {User} from '../../types/User';
import {LogInError} from '../../types/LogInError';

export const getAuthStatus = (state: State): AuthStatus => state[Namespace.Auth].authorizationStatus;

export const getUser = (state: State): User | null => state[Namespace.Auth].user;

export const getLoginError = (state: State): LogInError => state[Namespace.Auth].loginError;

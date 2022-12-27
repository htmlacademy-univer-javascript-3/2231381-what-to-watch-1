import {authProcess, setLoginError} from "./auth-process";
import {AuthStatus} from "../../types/AuthStatus";
import {LogInError} from "../../types/LogInError";
import {AuthProcess} from "../../types/state";
import {getAuthStatus, login, logout} from "../api-action";
import {makeFakeUser} from "../../utils/mocks";

const mockUser = makeFakeUser();

describe('Reducer: authProcess', () => {
  let state: AuthProcess;

  const initialState: AuthProcess = {
    authorizationStatus: AuthStatus.Unknown,
    user: null,
    loginError: LogInError.NoError,
  }

  beforeEach(() => { state = {...initialState}; })

  it('should return initial state without additional parameters', () => {
    expect(authProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update loginError to payload data', () => {
    expect(authProcess.reducer(state, { type: setLoginError.type, payload: LogInError.NotValidEmailAndPasswordCombination }))
      .toEqual({...initialState, loginError: LogInError.NotValidEmailAndPasswordCombination});
  })

  it('should update authorizationStatus to "Authorized" and update user to payload data when user is authorized', () => {
    expect(authProcess.reducer(state, { type: getAuthStatus.fulfilled.type, payload: mockUser }))
      .toEqual({
        authorizationStatus: AuthStatus.Authorized,
        user: mockUser,
        loginError: initialState.loginError
      });
  });

  it('should update authorizationStatus to "NotAuthorized" when user is not authorized', () => {
    expect(authProcess.reducer(state, { type: getAuthStatus.rejected.type }))
      .toEqual({...initialState, authorizationStatus: AuthStatus.NotAuthorized});
  });

  it('should update authorizationStatus to "Authorized" and update user to payload data when login fulfilled', () => {
    expect(authProcess.reducer(state, { type: login.fulfilled.type, payload: mockUser }))
      .toEqual({
        authorizationStatus: AuthStatus.Authorized,
        user: mockUser,
        loginError: initialState.loginError
      });
  });

  it('should set login error when login rejected', () => {
    expect(authProcess.reducer(state, { type: login.rejected.type }))
      .toEqual({...initialState, loginError: LogInError.NotValidEmailAndPasswordCombination,});
  });

  it('should update authorizationStatus to "NotAuthorized" when logout fulfilled', () => {
    expect(authProcess.reducer(state, { type: logout.fulfilled.type }))
      .toEqual({...initialState, authorizationStatus: AuthStatus.NotAuthorized});
  });
})

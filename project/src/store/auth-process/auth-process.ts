import {AuthProcess} from '../../types/state';
import {AuthStatus} from '../../types/AuthStatus';
import {LogInError} from '../../types/LogInError';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {StoreNameSpace} from '../../const';
import {getAuthStatus, login, logout} from '../api-action';

const initialState: AuthProcess = {
  authorizationStatus: AuthStatus.Unknown,
  user: null,
  loginError: LogInError.NoError,
};

export const authProcess = createSlice({
  name: StoreNameSpace.Auth,
  initialState,
  reducers: {
    setLoginError: (state, action: PayloadAction<LogInError>) => {
      state.loginError = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getAuthStatus.fulfilled, (state, action) => {
        state.authorizationStatus = AuthStatus.Authorized;
        state.user = action.payload;
      })
      .addCase(getAuthStatus.rejected, (state) => {
        state.authorizationStatus = AuthStatus.NotAuthorized;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authorizationStatus = AuthStatus.Authorized;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.loginError = LogInError.NotValidEmailAndPasswordCombination;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthStatus.NotAuthorized;
      });
  }
});

export const {setLoginError} = authProcess.actions;

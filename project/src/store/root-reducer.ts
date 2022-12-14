import {StoreNameSpace} from '../const';
import {combineReducers} from '@reduxjs/toolkit';
import {filmData} from './film-data/film-data';
import {mainData} from './main-data/main-data';
import {authProcess} from './auth-process/auth-process';

export const rootReducer = combineReducers({
  [StoreNameSpace.Film]: filmData.reducer,
  [StoreNameSpace.Main]: mainData.reducer,
  [StoreNameSpace.Auth]: authProcess.reducer,
});

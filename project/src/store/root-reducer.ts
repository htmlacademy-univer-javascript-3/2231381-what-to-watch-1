import {Namespace} from '../const';
import {combineReducers} from '@reduxjs/toolkit';
import {filmData} from './film-data/film-data';
import {mainData} from './main-data/main-data';
import {authProcess} from './auth-process/auth-process';
import {myListData} from './my-list-data/my-list-data';

export const rootReducer = combineReducers({
  [Namespace.Film]: filmData.reducer,
  [Namespace.Main]: mainData.reducer,
  [Namespace.Auth]: authProcess.reducer,
  [Namespace.MyList]: myListData.reducer,
});

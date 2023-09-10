/* eslint-disable sort-imports */
import { configureStore } from '@reduxjs/toolkit';
import dbConnectionReducer from '../slices/dbConnectionSlice';
import currentSqlQuery from '../slices/currentSqlQuerySlice';
import sqlQuerySlice from '../slices/sqlQuerySlice';

export const store = configureStore({
  reducer: {
    dbConnection: dbConnectionReducer,
    currentSqlQuery: currentSqlQuery,
    query: sqlQuerySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

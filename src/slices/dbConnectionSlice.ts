import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../App/store';

interface FormData {
  host: string;
  database: string;
  password: string;
  user: string;
  port: string;
}

const initialState = {
  host: '',
  database: '',
  password: '',
  user: '',
  port: '',
};

export const dbConnectionSlice = createSlice({
  name: 'dbConnection',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    update: (state: FormData, action: PayloadAction<FormData>) => {
      const { host, database, password, user, port } = action.payload;
      state.host = host;
      state.database = database;
      state.password = password;
      state.user = user;
      state.port = port;
    },
    reset: (state: FormData) => {
      const { host, database, password, user, port } = initialState;
      state.host = host;
      state.database = database;
      state.password = password;
      state.user = user;
      state.port = port;
    },
  },
});

export const { update, reset } = dbConnectionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFormData = (state: RootState) => state.dbConnection;

export default dbConnectionSlice.reducer;

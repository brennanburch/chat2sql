import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../App/store';

interface Query {
  query: string;
}

const initialState = {
  query: '',
};

export const sqlQuerySlice = createSlice({
  name: 'sqlQuery',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    update: (state: Query, action: PayloadAction<Query>) => {
      const { query } = action.payload;
      console.log(query);
      state.query = query;
    },
    reset: (state: Query) => {
      const { query } = initialState;
      state.query = query;
    },
  },
});

export const { update, reset } = sqlQuerySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSqlQuery = (state: RootState) => state.query;

export default sqlQuerySlice.reducer;

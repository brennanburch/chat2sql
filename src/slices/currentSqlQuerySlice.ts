import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../App/store';

interface RawResponse {
  rawResponse: string;
}

const initialState = {
  rawResponse: '',
};

export const currentSqlQuerySlice = createSlice({
  name: 'currentSqlQuery',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    update: (state: RawResponse, action: PayloadAction<RawResponse>) => {
      const { rawResponse } = action.payload;
      console.log(rawResponse);
      state.rawResponse = rawResponse;
    },
    reset: (state: RawResponse) => {
      const { rawResponse } = initialState;
      state.rawResponse = rawResponse;
    },
  },
});

export const { update, reset } = currentSqlQuerySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentSqlQuery = (state: RootState) => state.currentSqlQuery;

export default currentSqlQuerySlice.reducer;

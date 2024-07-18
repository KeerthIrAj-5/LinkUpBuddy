import { createSelector } from '@reduxjs/toolkit';

const selectAuthState = (state) => state.auth;

export const selectUserId = createSelector(
  selectAuthState,
  (auth) => auth.user?.id
);

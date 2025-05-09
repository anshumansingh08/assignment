import { configureStore } from "@reduxjs/toolkit";
import applicantReducer from "../features/form/formSlice";
export const store = configureStore({
  reducer: {
    applicant: applicantReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

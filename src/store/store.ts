import { configureStore } from "@reduxjs/toolkit";
import landingReducer from "@/shared/api/landing.slice";

export const store = configureStore({
  reducer: {
    landing: landingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

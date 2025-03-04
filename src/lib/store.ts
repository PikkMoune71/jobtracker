import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import jobReducer from "@/store/slices/jobSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["job"],
};

const jobPersistedReducer = persistReducer(persistConfig, jobReducer);

export const store = configureStore({
  reducer: {
    job: jobPersistedReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

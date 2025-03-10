import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import jobReducer from "@/store/slices/jobSlice";
import statusReducer from "@/store/slices/statusSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["job", "status"],
};

const jobPersistedReducer = persistReducer(persistConfig, jobReducer);
const statusPersistedReducer = persistReducer(persistConfig, statusReducer);

export const store = configureStore({
  reducer: {
    jobs: jobPersistedReducer,
    status: statusPersistedReducer,
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

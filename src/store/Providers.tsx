"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/lib/store";
import { I18nProviderClient } from "@/locales/client";
import { PropsWithChildren } from "react";

export const Providers = (props: PropsWithChildren<{ locale: string }>) => {
  return (
    <I18nProviderClient locale={props.locale}>
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          {props.children}
        </PersistGate>
      </Provider>
    </I18nProviderClient>
  );
};

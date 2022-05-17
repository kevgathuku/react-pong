import "../src/index.css";
import "../src/App.css";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../src/app/store";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

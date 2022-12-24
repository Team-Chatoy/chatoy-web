/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import { HopeProvider } from "@hope-ui/core";
import { App } from "./App";

render(() => (
  <Router base="chatoy-web">
    <HopeProvider>
      <App />
    </HopeProvider>
  </Router>
), document.getElementById("root") as HTMLElement);

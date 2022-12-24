import { Route, Routes } from "@solidjs/router";
import { StateProvider } from "./state";
import { Home, Login, Chat } from "./pages";

export const App = () => (
  <StateProvider>
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/chat" component={Chat} />
    </Routes>
  </StateProvider>
);

import { Route, Routes } from "@solidjs/router";
import { Home } from "./pages";

export const App = () => (
  <Routes>
    <Route path="/" component={Home} />
  </Routes>
);

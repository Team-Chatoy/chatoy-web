import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { IMessage } from "./types";

interface IData {
  server: string;
  token: string;
  msgs: IMessage[];
}

type TState = [
  IData,
  {
    setServer: (server: string) => void,
    setToken: (token: string) => void,
    addMessage: (msg: IMessage) => void,
  },
];

const StateContext = createContext<TState>();

export const StateProvider = (props: { children: any }) => {
  const initData: IData = {
    server: "",
    token: "",
    msgs: [],
  };

  const [data, setData] = createStore(initData);

  const state: TState = [
    data,
    {
      setServer: (server: string) => setData({ server }),
      setToken: (token: string) => setData({ token }),
      addMessage: (msg: IMessage) => setData("msgs", msgs => [...msgs, msg]),
    },
  ];

  return (
    <StateContext.Provider value={state}>
      {props.children}
    </StateContext.Provider>
  );
};

export const useState = () => {
  const state = useContext(StateContext);

  if (typeof state === "undefined")
    throw new Error("useState must be used within a StateProvider");

  return state;
};

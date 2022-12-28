import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { IMessage, IUser } from "./types";

interface IData {
  server: string;
  token: string;
  me: IUser | null;
  msgs: IMessage[];
  userDict: { [id: number]: IUser | undefined };
}

type TState = [
  IData,
  {
    setServer: (server: string) => void,
    setToken: (token: string) => void,
    setMe: (me: IUser) => void,
    addMessage: (msg: IMessage) => void,
    addUserInfo: (user: IUser) => void,
  },
];

const StateContext = createContext<TState>();

export const StateProvider = (props: { children: any }) => {
  const initData: IData = {
    server: "",
    token: "",
    me: null,
    msgs: [],
    userDict: { },
  };

  const [data, setData] = createStore(initData);

  const state: TState = [
    data,
    {
      setServer: (server: string) => setData({ server }),
      setToken: (token: string) => setData({ token }),
      setMe: (me: IUser) => setData({ me }),
      addMessage: (msg: IMessage) => setData("msgs", msgs => [...msgs, msg]),
      addUserInfo: (user: IUser) => setData("userDict", userDict => ({ ...userDict, [user.id]: user })),
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

import dayjs from "dayjs";
import { IUser } from "../types";

export const getUserInfo = async (
  server: string,
  id: number,
): Promise<IUser | null> => {
  const resp = await fetch(`http://${server}/users/${id}`);

  if (resp.ok) {
    const res = await resp.json();
    res.registered = dayjs(res.registered);

    return res;
  }

  return null;
};

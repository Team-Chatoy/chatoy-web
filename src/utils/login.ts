import { IUser } from "../types";

export const login = async (
  server: string,
  username: string,
  password: string,
): Promise<[boolean, string, IUser | null]> => {
  const resp = await fetch(`http://${server}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const { code, msg, user } = await resp.json();

  return [code === 0, msg, user];
};

import { IRoom } from "../state";

export const fetchRooms = async (
  server: string,
  token: string
): Promise<[boolean, IRoom[]]> => {
  const resp = await fetch(`http://${server}/rooms/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resp.json();

  return [resp.ok, res];
};

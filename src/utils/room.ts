import dayjs from "dayjs";
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

  // 懒得标这个鬼类型了 XD
  res.forEach((room: any) => room.created = dayjs(room.created));

  return [resp.ok, res];
};

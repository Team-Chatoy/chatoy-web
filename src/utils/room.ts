import dayjs from "dayjs";
import { IRoom } from "../types";

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

export const joinRoom = async (
  server: string,
  token: string,
  id: number
): Promise<[boolean, string]> => {
  const resp = await fetch(`http://${server}/rooms/${id}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  const { code, msg } = await resp.json();

  return [code === 0, msg];
}

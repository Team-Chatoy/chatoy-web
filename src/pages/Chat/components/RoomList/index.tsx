import { For } from "solid-js";
import { Box } from "@hope-ui/core";
import { IRoom } from "../../../../types";
import { Card } from "..";

interface IRoomListProps {
  flex?: number;
  rooms: IRoom[];
  setRoom: (room: number) => void;
}

export const RoomList = (props: IRoomListProps) => {
  return (
    <Box overflowY="scroll" flex={props.flex}>
      <For each={props.rooms}>
        {(room) => (
          <Box m={2}>
            <Card room={room} setRoom={props.setRoom} />
          </Box>
        )}
      </For>
    </Box>
  );
};

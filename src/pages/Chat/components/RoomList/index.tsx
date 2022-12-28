import { For } from "solid-js";
import { Box, Flex } from "@hope-ui/core";
import { IRoom } from "../../../../types";
import { SearchBox } from "./SearchBox";
import { Room } from "./Room";

interface IRoomListProps {
  flex?: number;
  rooms: IRoom[];
  setRoom: (room: IRoom) => void;
  refetchRoom: () => void;
}

export const RoomList = (props: IRoomListProps) => {
  return (
    <Flex
      direction="column"
      flex={props.flex}
    >
      <SearchBox refetchRoom={props.refetchRoom} />
      <Box overflowY="auto">
        <For each={props.rooms}>
          {(room) => (
            <Box m={2}>
              <Room room={room} setRoom={props.setRoom} />
            </Box>
          )}
        </For>
      </Box>
    </Flex>
  );
};

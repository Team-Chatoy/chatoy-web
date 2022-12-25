import { For } from "solid-js";
import { Box, Divider, Flex, Text } from "@hope-ui/core";
import { IRoom } from "../../../../types";
import { useState } from "../../../../state";
import { Msg } from "./Msg";

interface IMsgListProps {
  room: IRoom;
  flex?: number;
}

export const MsgList = (props: IMsgListProps) => {
  const [state] = useState();

  const msgs = () => state.msgs.filter((msg) => msg.room === props.room.id);

  return (
    <Flex
      direction="column"
      flex={props.flex}
      px={5}
      pt={5}
      h={0}
    >
      <Text
        size="2xl"
        fontWeight="semibold"
      >
        {props.room.name}
      </Text>
      <Divider variant="dashed" my={2} />
      <Box overflowY="auto">
        <For each={msgs()}>
          {(msg) => <Msg msg={msg} />}
        </For>
      </Box>
    </Flex>
  );
};

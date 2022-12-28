import { createEffect, For } from "solid-js";
import { Box, Divider, Flex, Text } from "@hope-ui/core";
import { IMessage, IRoom } from "../../../../types";
import { useState } from "../../../../state";
import { Msg } from "./Msg";

interface IMsgListProps {
  room: IRoom;
  flex?: number;
}

export const MsgList = (props: IMsgListProps) => {
  const [state] = useState();

  const msgs = () => state.msgs.filter((msg) => msg.room === props.room.id);

  createEffect((prev: IMessage[]) => {
    const newMsgs = msgs();

    if (prev.length === 0)
      return newMsgs;

    const diff = newMsgs.filter(msg => !prev.find(m => m.uuid === msg.uuid));
    const diffMsg = diff.find(msg => msg.room === props.room.id);

    if (typeof diffMsg !== "undefined") {
      Promise.resolve() // scroll the msg list after rendering new msg
        .then(() => {
          const msgList = document.getElementById("msg-list")!;
          msgList.scrollTop = msgList.scrollHeight;
        });
    }

    return newMsgs;
  }, []);

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
      <Box id="msg-list" overflowY="auto">
        <For each={msgs()}>
          {(msg) => <Msg msg={msg} />}
        </For>
      </Box>
    </Flex>
  );
};

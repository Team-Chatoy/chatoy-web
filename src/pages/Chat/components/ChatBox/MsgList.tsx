import { createEffect, createSignal, For, Show } from "solid-js";
import { Box, Divider, Flex, Icon, IconButton, IconProps, Text } from "@hope-ui/core";
import { IMessage, IRoom } from "../../../../types";
import { useState } from "../../../../state";
import { Msg } from "./Msg";

interface IMsgListProps {
  room: IRoom;
  flex?: number;
}

export const MsgList = (props: IMsgListProps) => {
  const [autoScroll, setAutoScroll] = createSignal(true);
  const [newMsg, setNewMsg] = createSignal(false);
  const [state] = useState();

  const msgs = () => state.msgs.filter((msg) => msg.room === props.room.id);

  const scrollToBottom = () => {
    const msgList = document.getElementById("msg-list")!;
    msgList.scrollTop = msgList.scrollHeight;
  };

  createEffect((prev: IMessage[]) => {
    const newMsgs = msgs();

    if (prev.length === 0)
      return newMsgs;

    const diff = newMsgs.filter(msg => !prev.find(m => m.uuid === msg.uuid));
    const diffMsg = diff.find(msg => msg.room === props.room.id);

    if (typeof diffMsg !== "undefined") {
      if (!autoScroll()) {
        setNewMsg(true);
        return newMsgs;
      }

      Promise.resolve() // scroll the msg list after rendering new msg
        .then(scrollToBottom);
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
      <Box
        id="msg-list"
        pos="relative"
        overflowY="auto"
        onScroll={(e) => {
          const atBottom = e.target.clientHeight + e.target.scrollTop === e.target.scrollHeight;
          setAutoScroll(atBottom);
          if (atBottom) {
            setNewMsg(false);
          }
        }}
      >
        <For each={msgs()}>
          {(msg) => <Msg msg={msg} />}
        </For>
        <Show when={newMsg()}>
          <Flex
            pos="sticky"
            bottom="20px"
            direction="row-reverse"
            pr="20px"
          >
            <IconButton
              aria-label="Jump to the latest"
              onClick={scrollToBottom}
            >
              <DownIcon />
            </IconButton>
          </Flex>
        </Show>
      </Box>
    </Flex>
  );
};

const DownIcon = (props: IconProps) => (
  <Icon viewBox="0 0 384 512" {...props}>
    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
  </Icon>
);

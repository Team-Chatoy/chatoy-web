import { Show } from "solid-js";
import { Box, Center, Flex, Text } from "@hope-ui/core";
import { MessageContent } from "../../../../types";
import { MsgList } from "./MsgList";
import { InputBox } from "./InputBox";

const InitChatBox = (props: { flex?: number }) => (
  <Center flex={props.flex}>
    <Box>
      <Text size="5xl">
        Hello, Chatoy!
      </Text>
      <Text size="xl">
        Please select one from the room list on the left to start chatting.
      </Text>
    </Box>
  </Center>
);

interface IChatBoxProps {
  room: number;
  flex?: number;
  sendMsg: (room: number, msg: MessageContent) => void;
}

export const ChatBox = (props: IChatBoxProps) => {
  return (
    <Show
      when={props.room !== -1}
      fallback={<InitChatBox flex={props.flex} />}
    >
      <Flex
        direction="column"
        flex={props.flex}
      >
        <MsgList flex={1} room={props.room} />
        <InputBox
          room={props.room}
          sendMsg={props.sendMsg}
        />
      </Flex>
    </Show>
  );
};

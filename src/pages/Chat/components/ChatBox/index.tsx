import { Show } from "solid-js";
import { Box, Center, Flex, Text } from "@hope-ui/core";
import { IRoom, MessageContent } from "../../../../types";
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
  room: IRoom | undefined;
  flex?: number;
  sendMsg: (room: number, msg: MessageContent) => void;
}

export const ChatBox = (props: IChatBoxProps) => {
  return (
    <Show
      when={typeof props.room !== "undefined"}
      fallback={<InitChatBox flex={props.flex} />}
    >
      <Flex
        direction="column"
        flex={props.flex}
      >
        <MsgList flex={1} room={props.room!} />
        <InputBox
          room={props.room!.id}
          sendMsg={props.sendMsg}
        />
      </Flex>
    </Show>
  );
};

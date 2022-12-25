import { Box, Center, Flex, Text } from "@hope-ui/core";
import { Show } from "solid-js";

interface IChatBoxProps {
  room: number;
  flex?: number;
}

export const ChatBox = (props: IChatBoxProps) => {
  return (
    <Show
      when={props.room !== -1}
      fallback={(
        <Center flex={props.flex}>
          <Text>Hello, Chatoy!</Text>
        </Center>
      )}
    >
      <Flex
        direction="column"
        flex={props.flex}
      >
        <Box flex={3}>
          Room #{props.room}
        </Box>
        <Box flex={1}>
          Input
        </Box>
      </Flex>
    </Show>
  );
};

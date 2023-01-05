import { createSignal } from "solid-js";
import { Box, Button, Flex, Input } from "@hope-ui/core";
import { MessageContent } from "../../../../types";

interface IInputBoxProps {
  room: number;
  sendMsg: (room: number, msg: MessageContent) => void;
}

export const InputBox = (props: IInputBoxProps) => {
  const [text, setText] = createSignal("");

  const sendMsg = () => {
    if (text().trim() === "") {
      setText("");
      return;
    }

    props.sendMsg(props.room, {
      type: "Text",
      text: text(),
    });
    setText("");
  };

  return (
    <Flex>
      <Box flex={1}>
        <Input
          rounded={0}
          placeholder="Write a message..."
          value={text()}
          onInput={(e) => setText(e.currentTarget.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMsg();
            }
          }}
        />
      </Box>
      <Button
        variant="solid"
        roundedLeft={0}
        onClick={sendMsg}
      >
        Send
      </Button>
    </Flex>
  );
};

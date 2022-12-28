import { Show } from "solid-js";
import { Box, Flex, Text } from "@hope-ui/core";
import dayjs from "dayjs";
import { IMessage, IUser } from "../../../../types";
import { useState } from "../../../../state";

interface IMsgBoxProps {
  sender: IUser;
  msg: IMessage;
}

export const MsgBox = (props: IMsgBoxProps) => {
  const [state] = useState();
  const now = dayjs();
  const time = props.msg.sent;

  const sentBySelf = () => props.sender.id === state.me!.id;

  let time_str: () => string;

  if (time.day === now.day) {
    time_str = () => time.format("HH:mm");
  } else {
    time_str = () => time.format("MM-DD HH:mm");
  }

  return (
    <Flex
      direction={sentBySelf() ? "row-reverse" : "row"}
      mr={sentBySelf() ? 5 : 0}
    >
      <Box
        background={sentBySelf() ? "success.50" : undefined}
        border={!sentBySelf() ? theme => `1px solid ${theme.vars.colors.neutral["200"]}` : undefined}
        rounded="md"
        shadow="sm"
        maxW="500px"
        px={3}
        py={2}
      >
        <Show when={!sentBySelf()}>
          <Flex
            justify="space-between"
            align="center"
          >
            <Text
              color="primary.400"
              fontWeight="semibold"
            >
              {props.sender.nickname}
            </Text>
            {/* reserved for future moderator tag
              <Flex
                px={2}
                py={1}
                align="center"
                bgColor="success.50"
                color="success.800"
                rounded="full"
              >
                <Text
                  as="span"
                  size="xs"
                  lineHeight="none"
                  fontWeight="semibold"
                >
                  #{props.room.id}
                </Text>
              </Flex>
            */}
          </Flex>
        </Show>
        <Flex
          align="flex-end"
          justify="space-between"
        >
          <Text id="msg" flex={1}>
            {props.msg.data.text}
          </Text>
          <Text
            size="sm"
            color="neutral.400"
            ml={5}
          >
            {time_str()}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

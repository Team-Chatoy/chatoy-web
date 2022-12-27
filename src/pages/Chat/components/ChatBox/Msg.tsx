import { createSignal, onMount, Show } from "solid-js";
import { Box, Flex, Text } from "@hope-ui/core";
import { IMessage, IUser } from "../../../../types";
import { useState } from "../../../../state";
import { getUserInfo } from "../../../../utils";

const LoadingMsg = () => {
  return (
    <Flex>
      <Text>Loading...</Text>
    </Flex>
  );
};

interface IMsgProps {
  msg: IMessage;
}

const MyMsg = (props: IMsgProps) => {
  return (
    <Flex
      direction="row-reverse"
      mr={5}
    >
      <Text color="Green">{props.msg.data.text}</Text>
    </Flex>
  );
};

export const Msg = (props: IMsgProps) => {
  const [sender, setSender] = createSignal<IUser>();
  const [state, { addUserInfo }] = useState();

  onMount(() => {
    const sender = state.userDict[props.msg.sender];
    
    if (typeof sender !== "undefined") {
      setSender(sender);
      return;
    }

    getUserInfo(state.server, props.msg.sender)
      .then((user) => {
        if (user !== null) {
          addUserInfo(user);
          setSender(user);
        }
      });
  });

  return (
    <Box my={1}>
      <Show
        when={typeof sender() !== "undefined"}
        fallback={<LoadingMsg />}
      >
        <Show
          when={sender()!.id !== state.me!.id}
          fallback={<MyMsg msg={props.msg} />}
        >
          <Flex>
            {`${sender()!.nickname}: ${props.msg.data.text}`}
          </Flex>
        </Show>
      </Show>
    </Box>
  );
};

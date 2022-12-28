import { createSignal, onMount, Show } from "solid-js";
import { Box, Flex, Text } from "@hope-ui/core";
import { IMessage, IUser } from "../../../../types";
import { useState } from "../../../../state";
import { getUserInfo } from "../../../../utils";
import { MsgBox } from "./MsgBox";

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
    <Box my={2}>
      <Show
        when={typeof sender() !== "undefined"}
        fallback={<LoadingMsg />}
      >
        <MsgBox sender={sender()!} msg={props.msg} />
      </Show>
    </Box>
  );
};

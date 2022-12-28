import { createSignal } from "solid-js";
import { Box, Button, Flex, HStack, Input, Modal, Text } from "@hope-ui/core";
import { useState } from "../../../../state";
import { joinRoom } from "../../../../utils";

export const SearchBox = (props: { refetchRoom: () => void; }) => {
  const [id, setId] = createSignal("");
  const [modalOpen, setModalOpen] = createSignal(false);
  const [errMsg, setErrMsg] = createSignal("");
  const [state] = useState();

  const onErr = (msg: string) => {
    setErrMsg(msg);
    setModalOpen(true);
  };

  const onJoinRoom = () => {
    joinRoom(state.server, state.token, Number(id()))
      .then((res) => {
        if (res[0]) {
          props.refetchRoom();
        } else {
          console.error(res[1]);
          onErr(res[1]);
        }
      });
  };

  return (
    <Flex>
      <Box flex={1}>
        <Input
          size="sm"
          rounded={0}
          placeholder="Join new room..."
          value={id()}
          onInput={(e) => setId(e.currentTarget.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onJoinRoom();
            }
          }}
        />
      </Box>
      <Button
        variant="solid"
        size="sm"
        rounded={0}
        onClick={onJoinRoom}
      >
        Join
      </Button>
      <Modal
        isOpen={modalOpen()}
        onClose={() => setModalOpen(false)}
      >
        <Modal.Overlay />
        <Modal.Content p={4}>
          <HStack justifyContent="space-between" mb={4}>
            <Modal.Heading
              color="red"
              fontWeight="semibold"
            >
              Error
            </Modal.Heading>
            <Modal.CloseButton />
          </HStack>
          <Text mb={2}>{errMsg()}</Text>
        </Modal.Content>
      </Modal>
    </Flex>
  );
};

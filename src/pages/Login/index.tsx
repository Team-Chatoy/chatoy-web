import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Box, Button, Center, Heading, HStack, Input, Modal, Text } from "@hope-ui/core";
import { useState } from "../../state";
import { login } from "../../utils";
import { centerBox } from "../styles";

export const Login = () => {
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [modalOpen, setModalOpen] = createSignal(false);
  const [errMsg, setErrMsg] = createSignal("");
  const navigate = useNavigate();
  const [state, { setToken }] = useState();

  if (state.server === "")
    navigate("/");

  const onErr = (msg: string) => {
    setErrMsg(msg);
    setModalOpen(true);
  };

  const onLogin = () => {
    if (username() === "") {
      onErr("Username can NOT be empty!");
      return;
    }

    if (password() === "") {
      onErr("Password can NOT be empty!");
      return;
    }

    login(state.server, username(), password())
      .then(([ok, msg]) => {
        if (ok) {
          setToken(msg);
          navigate("/chat");
        } else {
          onErr(msg);
        }
      });
  };

  return (
    <Box
      class={centerBox()}
      w="500px"
      h="252px"
      bg="#81D4FA"
      p="20px"
      rounded="2xl"
    >
      <Center mb="20px">
        <Heading size="2xl">Sign in to {state.server}</Heading>
      </Center>
      <Center p="0 30px" mb="20px">
        <Text size="xl" mr="10px">
          Username
        </Text>
        <Input
          bg="white"
          value={username()}
          onInput={(event) => setUsername(event.currentTarget.value)}
        />
      </Center>
      <Center p="0 30px" mb="20px">
        <Text size="xl" mr="10px">
          Password
        </Text>
        <Input
          bg="white"
          type="password"
          value={password()}
          onInput={(event) => setPassword(event.currentTarget.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter")
              onLogin();
          }}
        />
      </Center>
      <Center>
        <Button
          variant="solid"
          onClick={onLogin}
        >
          Sign in
        </Button>
      </Center>
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
    </Box>
  );
};

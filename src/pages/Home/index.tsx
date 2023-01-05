import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Box, Button, Center, Heading, Input } from "@hope-ui/core";
import { useState } from "../../state";
import { centerBox } from "../styles";

export const Home = () => {
  const [value, setValue] = createSignal("");
  const navigate = useNavigate();
  const [, { setServer }] = useState();

  const next = () => {
    setServer(value().trim());
    navigate("/login");
  };

  return (
    <Box
      class={centerBox()}
      w="400px"
      h="192px"
      bg="#81D4FA"
      p="20px"
      rounded="2xl"
    >
      <Center mb="20px">
        <Heading size="2xl">Server address</Heading>
      </Center>
      <Center p="0 30px" mb="20px">
        <Input
          bg="white"
          value={value()}
          onInput={(event) => setValue(event.currentTarget.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter")
              next();
          }}
        />
      </Center>
      <Center>
        <Button
          variant="solid"
          onClick={next}
        >
          Continue
        </Button>
      </Center>
    </Box>
  );
};

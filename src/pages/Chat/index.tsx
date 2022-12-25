import { createResource, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Container, Flex, Heading, Text } from "@hope-ui/core";
import { useState } from "../../state";
import { fetchRooms } from "../../utils";
import { ChatBox, RoomList } from "./components";

export const Chat = () => {
  const [room, setRoom] = createSignal(-1);
  const navigate = useNavigate();
  const [state] = useState();

  if (state.token === "") {
    navigate("/login");
  }

  const [rooms_raw] = createResource(async () => await fetchRooms(state.server, state.token));

  const rooms = () => {
    if (rooms_raw.loading) {
      return [];
    }

    const raw = rooms_raw()!;

    if (raw[0]) {
      return raw[1];
    }

    console.error("Error fetching rooms!");
    return [];
  };

  return (
    <Container h="full">
      <Flex
        direction="column"
        h="full"
        p={12}
      >
        <Heading size="2xl" mb={2}>
          Chatoy - {state.server}
        </Heading>
        <Text mb={5}>
          Your token: <code>{state.token}</code>
        </Text>
        <Flex h={0} flex={1}>
          <RoomList
            flex={1}
            rooms={rooms()}
            setRoom={setRoom}
          />
          <ChatBox room={room()} flex={3} />
        </Flex>
      </Flex>
    </Container>
  );
};

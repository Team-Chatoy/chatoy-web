import { createResource, createSignal, onCleanup } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Container, Flex, Heading, Text } from "@hope-ui/core";
import { v4 as uuidv4 } from "uuid";
import { MessageContent, WsData } from "../../types";
import { useState } from "../../state";
import { fetchRooms } from "../../utils";
import { ChatBox, RoomList } from "./components";

export const Chat = () => {
  const [room, setRoom] = createSignal(-1);
  const navigate = useNavigate();
  const [state, { addMessage }] = useState();

  if (state.token === "") {
    navigate("/login");
  }

  const ws = new WebSocket(`ws://${state.server}/ws`);

  ws.onopen = () => {
    ws.send(JSON.stringify({
      type: "Auth",
      token: state.token,
    }));
  };

  ws.onmessage = (e) => {
    const msg: WsData = JSON.parse(e.data);

    switch (msg.type) {
      case "Auth": {
        if (msg.code !== 0) {
          console.error("WebSocket auth failed!");
          console.error(msg.msg);
        }
        break;
      }

      case "Recv": {
        addMessage(msg.data);
        break;
      }
    }
  };

  const sendMsg = (room: number, msg: MessageContent) => {
    const uuid = uuidv4();

    ws.send(JSON.stringify({
      type: "Msg",
      uuid,
      room,
      data: msg,
    }));
  };

  onCleanup(() => ws.close());

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
        <Heading size="3xl" mb={2}>
          Chatoy - {state.server}
        </Heading>
        <Text mb={5}>
          Your token: <code>{state.token}</code>
        </Text>
        <Flex
          border={theme => `1px solid ${theme.vars.colors.neutral["200"]}`}
          rounded="lg"
          flex={1}
          h={0}
        >
          <RoomList
            flex={1}
            rooms={rooms()}
            setRoom={setRoom}
          />
          <ChatBox
            flex={3}
            room={room()}
            sendMsg={sendMsg}
          />
        </Flex>
      </Flex>
    </Container>
  );
};

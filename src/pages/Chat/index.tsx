import { useNavigate } from "@solidjs/router";
import { Box, Heading, Text } from "@hope-ui/core";
import { useState } from "../../state";

export const Chat = () => {
  const navigate = useNavigate();
  const [state] = useState();

  if (state.token === "") {
    navigate("/login");
  }

  return (
    <Box>
      <Heading>Chat Page</Heading>
      <Text>Your token: {state.token}</Text>
    </Box>
  );
};

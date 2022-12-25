import { Box, Button, Flex, Text } from "@hope-ui/core";
import { IRoom } from "../../../../state";

interface ICardProps {
  room: IRoom;
  setRoom: (room: number) => void;
}

export const Card = (props: ICardProps) => {
  return (
    <Box
      border={theme => `1px solid ${theme.vars.colors.neutral["200"]}`}
      rounded="lg"
      shadow="lg"
      w="full"
      bg="white"
      p={5}
    >
      <Flex
        justify="space-between"
        align="center"
        w="full"
        mb={2}
      >
        <Text fontWeight="semibold">
          {props.room.name}
        </Text>
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
      </Flex>
      <Text
        size="sm"
        color="neutral.500"
        mb={3}
      >
        {props.room.description}
      </Text>
      <Button
        isFullWidth
        variant="soft"
        colorScheme="primary"
        onClick={() => props.setRoom(props.room.id)}
      >
        Enter
      </Button>
    </Box>
  );
};

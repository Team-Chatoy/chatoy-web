import { Box } from "@hope-ui/core";

interface IMsgListProps {
  room: number;
  flex?: number;
}

export const MsgList = (props: IMsgListProps) => {
  return (
    <Box
      flex={props.flex}
      px={5}
      pt={5}
    >
      Room #{props.room}
    </Box>
  );
};

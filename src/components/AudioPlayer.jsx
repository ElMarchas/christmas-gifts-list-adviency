import {
  Flex,
  Center,
  Stack,
  HStack,
  Heading,
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightAddon,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

import padoru from "../../public/padoru.mp3";

function AudioPlayer() {
  const audio = new Audio(padoru);
  audio.loop = true;
  audio.volume = 0.35;
  audio.playbackRate = 1.25;
  return (
    <HStack>
      <Button
        colorScheme="pink"
        onClick={() => {
          audio.play();
        }}
      >
        Play
      </Button>
      <Button
        colorScheme="pink"
        onClick={() => {
          audio.pause();
        }}
      >
        Stop
      </Button>
    </HStack>
  );
}

export default AudioPlayer;

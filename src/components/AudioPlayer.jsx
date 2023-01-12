import { useContext, useState, useEffect, useRef } from "react";
import { GiftsContext } from "../context/Context";

import { HStack, Button } from "@chakra-ui/react";

import padoru from "../assets/media/padoru.mp3";
import santa from "../assets/media/santa.mp3";

function AudioPlayer() {
  const { isRave, setIsRave } = useContext(GiftsContext);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(new Audio(santa));

  useEffect(() => {
    audioRef.current.pause();
    if (isRave) {
      audioRef.current = new Audio(padoru);
      audioRef.current.volume = 0.7;
      audioRef.current.playbackRate = 1.25;
      audioRef.current.loop = true;
    } else {
      audioRef.current = new Audio(santa);
      audioRef.current.volume = 0.1;
      audioRef.current.playbackRate = 1;
      audioRef.current.loop = true;
    }

    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying, isRave]);

  return (
    <HStack>
      <Button
        colorScheme="brand"
        size="xs"
        variant="ghost"
        fontSize="1.3rem"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? "⏸️" : "▶️"}
      </Button>
      <Button
        colorScheme="brand"
        size="xs"
        onClick={() => {
          if (!isPlaying && !isRave) setIsPlaying(true);
          setIsRave(!isRave);
        }}
      >
        {isRave ? "Not Padoru" : "Padoru"}
      </Button>
    </HStack>
  );
}

export default AudioPlayer;

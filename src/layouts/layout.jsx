import { Flex, Stack, Heading, Box, Divider, Spacer } from "@chakra-ui/react";

import { useContext, useState, useEffect } from "react";
import { GiftsContext } from "../context/Context";
import Snowfall from "react-snowfall";

import { DrawerNewGift } from "../components/DrawerGift";
import AudioPlayer from "../components/AudioPlayer";
import GiftList from "../components/GiftList";

function Layout() {
  const { gifts, addGift, isRave } = useContext(GiftsContext);
  const [seconds, setSeconds] = useState("");

  const snowWaifu1 = document.createElement("img");
  const snowWaifu2 = document.createElement("img");
  const snowWaifu3 = document.createElement("img");
  const snowWaifu4 = document.createElement("img");
  const snowWaifu5 = document.createElement("img");
  const snowWaifu6 = document.createElement("img");
  snowWaifu1.src = "bocchi.png";
  snowWaifu2.src = "chisato.webp";
  snowWaifu3.src = "tomoko.png";
  snowWaifu4.src = "4ee.png";
  snowWaifu5.src = "lucoa.png";
  snowWaifu6.src = "megumin.png";
  const images = [
    snowWaifu1,
    snowWaifu2,
    snowWaifu3,
    snowWaifu4,
    snowWaifu5,
    snowWaifu6,
  ];

  function handleRandom() {
    let randomColor1 = Math.floor(Math.random() * 16777215).toString(16);
    let randomColor2 = Math.floor(Math.random() * 16777215).toString(16);
    let randomColor3 = Math.floor(Math.random() * 16777215).toString(16);

    return `linear(to-tl, #${randomColor1}, #${randomColor2}, #${randomColor3})`;
  }

  useEffect(() => {
    if (!isRave) return;
    const interval = setInterval(() => {
      setSeconds(handleRandom());
    }, 1000);
    return () => clearInterval(interval);
  }, [isRave]);

  return (
    <div className="App">
      <Flex
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        bgImage={
          isRave ? "url('backgroundRave.jpg')" : "url('background.jpg')"
        }
        bgPosition="center"
        bgSize="cover"
      >
        <Box
          minH="200px"
          maxH="600px"
          minW="200px"
          maxW="500px"
          w="20rem"
          bg="whiteAlpha.900"
          borderRadius="2xl"
          padding="5"
          bgGradient={isRave ? seconds : ""}
        >
          <Stack direction="row" justifyContent="center">
            <Heading>Gifts:</Heading>
            <Spacer />
            <AudioPlayer />
          </Stack>

          <Stack mb="2">
            <DrawerNewGift
              layout={{ action: "add", header: "New Gift:", layer: "Add gift" }}
            />
            <Divider variant="lg-color" />
          </Stack>
          <Stack alignItems="center">
            <GiftList />
          </Stack>
        </Box>
      </Flex>
      <Snowfall
        snowflakeCount={100}
        images={isRave ? images : ""}
        radius={isRave ? [10, 50] : [0.5, 5]}
      />
    </div>
  );
}

export default Layout;

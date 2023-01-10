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

import { useContext } from "react";
import { GiftsContext } from "../context/Context";
import Snowfall from "react-snowfall";

import { DrawerNewGift } from "../components/DrawerGift";
import AudioPlayer from "../components/AudioPlayer";

import GiftList from "../components/GiftList";

function Layout() {
  const { gifts, addGift } = useContext(GiftsContext);

  const snowWaifu1 = document.createElement("img");
  const snowWaifu2 = document.createElement("img");
  const snowWaifu3 = document.createElement("img");
  const snowWaifu4 = document.createElement("img");
  const snowWaifu5 = document.createElement("img");
  const snowWaifu6 = document.createElement("img");
  snowWaifu1.src = "../src/assets/waifus/bocchi.png";
  snowWaifu2.src = "../src/assets/waifus/chisato.webp";
  snowWaifu3.src = "../src/assets/waifus/tomoko.png";
  snowWaifu4.src = "../src/assets/waifus/4ee.png";
  snowWaifu5.src = "../src/assets/waifus/lucoa.png";
  snowWaifu6.src = "../src/assets/waifus/megumin.png";
  const images = [
    snowWaifu1,
    snowWaifu2,
    snowWaifu3,
    snowWaifu4,
    snowWaifu5,
    snowWaifu6,
  ];

  return (
    <div className="App">
      <Flex
        width={"100vw"}
        height={"100vh"}
        alignContent={"center"}
        justifyContent={"center"}
        bgImage="url('/background.jpg')"
        bgPosition="center"
        bgSize="cover"
      >
        <Center>
          <Stack bg="white">
            <AudioPlayer />
            <DrawerNewGift
              layout={{ action: "add", header: "New Gift:", layer: "Add gift" }}
            />
            <GiftList />
          </Stack>
        </Center>
      </Flex>
      <Snowfall
        // Controls the number of snowflakes that are created (default 150)
        snowflakeCount={100}
        // Pass in the images to be used
        images={images}
        radius={[0.5, 50]}
      />
    </div>
  );
}

export default Layout;

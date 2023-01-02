import {
  Flex,
  Center,
  Stack,
  Heading,
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightAddon,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

import { useState, useContext } from "react";
import { GiftsContext } from "../context/Context";

import FormNewGifts from "../components/FormNewGifts";
import ModalNewGifts from "../components/ModalNewGift";
import GiftList from "../components/GiftList";

function Layout() {
  const { gifts, addGift } = useContext(GiftsContext);

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
            <ModalNewGifts />
            <FormNewGifts />
            <GiftList />
          </Stack>
        </Center>
      </Flex>
    </div>
  );
}

export default Layout;

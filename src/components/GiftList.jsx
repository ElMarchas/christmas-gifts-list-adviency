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
  Image,
} from "@chakra-ui/react";

import { useState, useContext } from "react";
import { GiftsContext } from "../context/Context";

function EmptyGiftList(params) {
  return <h1>No hay nada perro</h1>;
}

function FullGiftList(params) {
  const { gifts, deleteAllGifts, deleteGift } = useContext(GiftsContext);
  const handleRemoveItem = (e) => {
    const btnid = Number(e.target.getAttribute("data-btnid"));
    deleteGift(btnid);
  };
  return (
    <Stack>
      {gifts.map((item) => {
        return (
          <Box backgroundColor="brand.200" color="red.700" key={item.id}>
            {item.gift + " : " + item.units + " : " + item.receiver}
            <Image
              boxSize="100px"
              objectFit="cover"
              src={item.picture}
              alt="Dan Abramov"
            />
            <Button
              colorScheme="pink"
              data-btnid={item.id}
              onClick={handleRemoveItem}
            >
              Delete
            </Button>
          </Box>
        );
      })}

      <Button colorScheme="pink" onClick={deleteAllGifts}>
        Delete All
      </Button>
    </Stack>
  );
}

function GiftList() {
  const { gifts } = useContext(GiftsContext);
  const someGifts = gifts.length;
  return someGifts >> 0 ? <FullGiftList /> : <EmptyGiftList />;
}

export default GiftList;

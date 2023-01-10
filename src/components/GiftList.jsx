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
  Divider,
  Text,
} from "@chakra-ui/react";

import { useContext } from "react";
import { GiftsContext } from "../context/Context";
import { DrawerNewGift } from "./DrawerGift";
import { ModalNewGift } from "./ModalPrint";

function EmptyGiftList(params) {
  return <h1>No hay nada perro</h1>;
}

function FullGiftList(params) {
  const { gifts, deleteAllGifts, deleteGift, totalPrice } =
    useContext(GiftsContext);
  const handleRemoveItem = (index) => {
    deleteGift(index);
  };
  return (
    <Stack>
      <Heading>Gifts:</Heading>
      {gifts.map((item, index) => {
        return (
          <Box backgroundColor="brand.200" color="red.700" key={item.id}>
            {item.gift +
              " : " +
              item.units +
              " : " +
              item.receiver +
              " : $" +
              (item.price * item.units).toFixed(2)}
            <Image
              boxSize="100px"
              objectFit="cover"
              src={item.picture}
              alt="Image"
            />
            <DrawerNewGift
              gift={item}
              layout={{ action: "edit", header: "Edit Gift:", layer: "Edit" }}
            />
            <DrawerNewGift
              gift={item}
              layout={{ action: "copy", header: "New Gift:", layer: "edit" }}
            />
            <Button
              colorScheme="pink"
              data-btnid={item.id}
              onClick={() => handleRemoveItem(index)}
            >
              Delete
            </Button>
          </Box>
        );
      })}
      <Divider />
      <Text fontWeight="semibold">Total: ${totalPrice()}</Text>
      <Button colorScheme="pink" onClick={deleteAllGifts}>
        Delete All
      </Button>
      <ModalNewGift />
    </Stack>
  );
}

function GiftList() {
  const { gifts } = useContext(GiftsContext);
  const someGifts = gifts.length;
  return someGifts >> 0 ? <FullGiftList /> : <EmptyGiftList />;
}

export default GiftList;

import { Stack, Box, Button, Image, Divider, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { GiftsContext } from "../context/Context";
import { DrawerNewGift } from "./DrawerGift";
import { ModalPrint } from "./ModalPrint";

function EmptyGiftList() {
  return <Text>nothing here, try to add a gift.</Text>;
}

function FullGiftList() {
  const { gifts, deleteAllGifts, deleteGift, totalPrice, isRave } =
    useContext(GiftsContext);
  const handleRemoveItem = (index) => {
    deleteGift(index);
  };
  return (
    <Stack>
      <Stack maxH="330px" overflowY="auto">
        {gifts.map((item, index) => {
          return (
            <Stack key={item.id} direction="row">
              <Image
                boxSize="80px"
                objectFit="cover"
                src={isRave ? "padoruGift.gif" : item.picture}
                alt="Image"
              />
              <Stack>
                <Box>
                  <Text fontSize="md">
                    {item.gift +
                      " (" +
                      item.units +
                      ")" +
                      " - $" +
                      (item.price * item.units).toFixed(2)}
                  </Text>

                  <Text fontSize="xs" color="gray.600">
                    {item.receiver}
                  </Text>
                </Box>
                <Box>
                  <DrawerNewGift
                    gift={item}
                    layout={{
                      action: "edit",
                      header: "Edit Gift:",
                      layer: "Edit",
                    }}
                  />
                  <DrawerNewGift
                    gift={item}
                    layout={{
                      action: "copy",
                      header: "New Gift:",
                      layer: "Copy",
                    }}
                  />
                  <Button
                    size="xs"
                    fontSize="xs"
                    colorScheme="brand"
                    variant="outline"
                    marginTop="-5"
                    data-btnid={item.id}
                    onClick={() => handleRemoveItem(index)}
                  >
                    Delete
                  </Button>
                </Box>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
      <Divider variant="md-color" />
      <Text fontWeight="semibold">Total: ${totalPrice()}</Text>
      <Button colorScheme="brandSec" onClick={deleteAllGifts}>
        Delete All
      </Button>
      <ModalPrint />
    </Stack>
  );
}

function GiftList() {
  const { gifts } = useContext(GiftsContext);
  const someGifts = gifts.length;
  return someGifts >> 0 ? <FullGiftList /> : <EmptyGiftList />;
}

export default GiftList;

import { useState, useContext, useRef, useEffect } from "react";
import { GiftsContext } from "../context/Context.jsx";
import { RANDOMGIFTS } from "../../public/RandomGifts";

import {
  useDisclosure,
  Button,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

function DrawerNewGift(props) {
  const { gifts, addGift, updateGift } = useContext(GiftsContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();
  const firstField = useRef();
  const secondField = useRef();

  const [formData, setFormData] = useState({
    id: props.gift ? props.gift.id : "",
    gift: props.gift ? props.gift.gift : "",
    units: props.gift
      ? props.layout.action === "copy"
        ? ""
        : props.gift.units
      : "",
    picture: props.gift ? props.gift.picture : "",
    receiver: props.gift
      ? props.layout.action === "copy"
        ? ""
        : props.gift.receiver
      : "",
    price: props.gift ? props.gift.price : "",
  });

  const [isError, setisError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const idGift = gifts.length > 0 ? gifts[gifts.length - 1].id : 0;

    if (formData.gift === "") {
      setisError(true);
      return;
    }

    if (formData.units === "") formData.units = 1;
    if (formData.picture === "") formData.picture = "/default.jpg";
    if (formData.receiver === "") formData.receiver = "El Marchas";
    if (formData.price === "") formData.price = 1;

    if (props.layout.action === "edit") {
      updateGift(props.gift.id, {
        id: props.gift.id,
        gift: formData.gift,
        units: formData.units,
        picture: formData.picture,
        receiver: formData.receiver,
        price: formData.price,
      });
    } else {
      addGift({
        id: idGift + 1,
        gift: formData.gift,
        units: formData.units,
        picture: formData.picture,
        receiver: formData.receiver,
        price: formData.price,
      });
    }

    onClose();
  }

  function handleChange(e) {
    const value = e.target.value;
    if (e.target.value !== "") setisError(false);

    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleOpen() {
    onOpen();
  }

  function handleClose() {
    onClose();
  }

  function handleRandom() {
    const randomItem = Math.floor(Math.random() * RANDOMGIFTS.length);
    const randomGift = RANDOMGIFTS[randomItem];

    setFormData({
      ...formData,
      gift: randomGift.gift,
      units: randomGift.units,
      picture: randomGift.picture,
      price: randomGift.price,
    });
  }

  return (
    <>
      <Button
        size={
          props.layout.action === "edit" || props.layout.action === "copy"
            ? "xs"
            : "md"
        }
        fontSize={
          props.layout.action === "edit" || props.layout.action === "copy"
            ? "xs"
            : "md"
        }
        variant={
          props.layout.action === "edit" || props.layout.action === "copy"
            ? "outline"
            : "solid"
        }
        marginInline={
          props.layout.action === "edit" || props.layout.action === "copy"
            ? "0.5"
            : "0"
        }
        marginTop={
          props.layout.action === "edit" || props.layout.action === "copy"
            ? "-5"
            : "0"
        }
        ref={btnRef}
        colorScheme="brand"
        onClick={handleOpen}
      >
        {props.layout.layer}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={handleClose}
        initialFocusRef={
          props.layout.action === "copy" ? secondField : firstField
        }
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {props.layout.header}
            {props.layout.action === "edit" && formData.id}
          </DrawerHeader>

          <DrawerBody>
            <Stack as="form" onSubmit={handleSubmit} spacing="3">
              <FormControl isInvalid={isError}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="🎁"
                  />
                  <Input
                    ref={firstField}
                    placeholder="what do you wish?"
                    type="text"
                    name="gift"
                    value={formData.gift}
                    onChange={handleChange}
                  />
                  {props.layout.action === "add" && (
                    <InputRightElement width="6.5rem">
                      <Button w="200px" onClick={handleRandom}>
                        Random
                      </Button>
                    </InputRightElement>
                  )}
                </InputGroup>
                {isError && (
                  <FormErrorMessage fontSize="xs">
                    Gift is required.
                  </FormErrorMessage>
                )}
              </FormControl>
              <InputGroup marginTop="3">
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="#️⃣"
                />
                <Input
                  ref={secondField}
                  placeholder="How many?"
                  type="number"
                  name="units"
                  value={formData.units}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="🫅"
                />
                <Input
                  placeholder="Who receive?"
                  type="text"
                  name="receiver"
                  value={formData.receiver}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="🖼️"
                />
                <Input
                  placeholder="Image link (URL)"
                  type="text"
                  name="picture"
                  value={formData.picture}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="🪙"
                />
                <Input
                  placeholder="What's the Price?"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </InputGroup>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              colorScheme="brand"
              variant="outline"
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button colorScheme="brand" onClick={handleSubmit}>
              Accept
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export { DrawerNewGift };

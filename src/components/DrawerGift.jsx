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
  Flex,
  Center,
  Stack,
  Heading,
  Box,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  FormControl,
  FormErrorMessage,
  FormHelperText,
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

  const [errorMessage, seterrorMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.units === "") {
      formData.units = 1;
    }
    if (formData.picture === "") {
      formData.picture = "/default.jpg";
    }
    if (formData.receiver === "") {
      formData.receiver = "El Marchas";
    }

    const idGift = gifts.length > 0 ? gifts[gifts.length - 1].id : 0;

    if (formData.gift === "") {
      seterrorMessage("Gift is required.");
      setisError(true);
      return;
    }

    /*
    const isFound = gifts.some((gift) => {
      if (gift.gift === formData.gift) {
        return true;
      }
    });

    if (isFound) {
      seterrorMessage("Gift already exist, try another");
      setisError(true);
      return;
    }
    */

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

    console.log(randomGift);

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
      <Button ref={btnRef} colorScheme="pink" onClick={handleOpen}>
        {props.layout.action}
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
            <Stack as="form" onSubmit={handleSubmit}>
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
                {isError && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="#️⃣"
                  />
                  <Input
                    ref={secondField}
                    placeholder="How many?"
                    type="text"
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
                    placeholder="Price"
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormControl>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Accept
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export { DrawerNewGift };

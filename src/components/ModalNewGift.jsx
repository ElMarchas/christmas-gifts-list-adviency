import { useState, useContext, useRef } from "react";
import { GiftsContext } from "../context/Context.jsx";

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

function ModalNewGift() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const [formData, setformData] = useState({
    gift: "",
    units: "",
    picture: "",
    receiver: "",
  });

  const [isError, setisError] = useState(false);

  const [errorMessage, seterrorMessage] = useState("");

  const { gifts, addGift } = useContext(GiftsContext);

  function handleSubmit(e) {
    e.preventDefault();

    const idGift = gifts.length > 0 ? gifts[gifts.length - 1].id : 0;
    if (formData.gift === "") {
      seterrorMessage("Gift is required.");
      setisError(true);
      return;
    }

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

    if (formData.picture === "") {
      formData.picture =
        "https://i.pinimg.com/originals/c6/21/5d/c6215d6d34f6dd4ad82b5b8244daa870.jpg";
    }

    console.log(formData);
    addGift({
      id: idGift + 1,
      gift: formData.gift,
      units: formData.units,
      picture: formData.picture,
      receiver: formData.receiver,
    });
    console.log(gifts);

    onClose();
  }

  function handleChange(e) {
    const value = e.target.value;
    if (e.target.value !== "") setisError(false);

    setformData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>New Gift:</DrawerHeader>

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
                    placeholder="what do you wish?"
                    type="text"
                    name="gift"
                    value={formData.gift}
                    onChange={handleChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button w="300px" type="submit">
                      Add
                    </Button>
                  </InputRightElement>
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
                    placeholder="URL of image of that"
                    type="text"
                    name="picture"
                    value={formData.picture}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormControl>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ModalNewGift;

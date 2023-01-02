import { useState, useContext } from "react";
import { GiftsContext } from "../context/Context.jsx";

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
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

function FormNewGifts() {
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
      id: gifts.length + 1,
      gift: formData.gift,
      units: formData.units,
      picture: formData.picture,
    });
    console.log(gifts);
  }

  function handleChange(e) {
    const value = e.target.value;
    if (e.target.value !== "") setisError(false);

    setformData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <Stack as="form" onSubmit={handleSubmit}>
      <FormControl isInvalid={isError}>
        <Heading>Gifts:</Heading>
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
        {isError && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
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
        {isError && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      </FormControl>
    </Stack>
  );
}

export default FormNewGifts;

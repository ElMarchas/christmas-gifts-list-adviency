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

import { useState } from "react";

function App() {
  const [gifts, setGifts] = useState([
    {
      id: 1,
      regalo: "¿Qué",
    },
    {
      id: 2,
      regalo: "mirás",
    },
    {
      id: 3,
      regalo: "bobo?",
    },
    {
      id: 4,
      regalo: "Pepa4",
    },
    {
      id: 5,
      regalo: "Pepa5",
    },
    {
      id: 6,
      regalo: "Pepa6",
    },
  ]);

  function handleAdd() {}

  const handleRemoveItem = (e: any) => {
    //console.log(crypto.randomUUID());
    const btnid: number = Number(e.target.getAttribute("data-btnid"));
    console.log(btnid);

    console.log(gifts);
    const filtedGifts = gifts.filter((Element) => {
      return Element.id !== btnid;
    });

    setGifts(filtedGifts);
  };
  return (
    <div className="App">
      <Flex
        width={"100vw"}
        height={"100vh"}
        alignContent={"center"}
        justifyContent={"center"}
        bgImage="url('/background.jpg')"
        bgPosition="center"
      >
        <Center>
          <Stack bg="white">
            <Heading>Gifts:</Heading>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children="🎁"
              />
              <Input placeholder="what do you wish?" />
              <InputRightElement width="4.5rem">
                <Button w="300px" onClick={handleAdd}>
                  Add
                </Button>
              </InputRightElement>
            </InputGroup>
            {gifts.map((item) => {
              return (
                <Box backgroundColor="brand.200" color="red.700" key={item.id}>
                  {item.regalo}
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

            <Button colorScheme="pink" onClick={() => setGifts([])}>
              Delete All
            </Button>
          </Stack>
        </Center>
      </Flex>
    </div>
  );
}

export default App;

import { useContext, useRef } from "react";
import { GiftsContext } from "../context/Context";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  Image,
  Heading,
  Stack,
} from "@chakra-ui/react";
import ReactToPrint from "react-to-print";

function ModalPrint() {
  const { gifts } = useContext(GiftsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const printArea = useRef(null);

  return (
    <>
      <Button border="2px" borderColor="brand.300" onClick={onOpen}>
        Preview
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody ref={printArea}>
            <Heading>To buy:</Heading>
            {gifts.map((item, index) => {
              return (
                <Stack key={item.id} direction="row" p={2}>
                  <Image
                    boxSize="80px"
                    objectFit="cover"
                    src={item.picture}
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
                  </Stack>
                </Stack>
              );
            })}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <ReactToPrint
              trigger={() => <Button variant="ghost">Print</Button>}
              content={() => printArea.current}
              onAfterPrint={() => onClose()}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export { ModalPrint };

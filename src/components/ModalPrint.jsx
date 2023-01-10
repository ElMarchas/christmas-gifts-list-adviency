import { useContext, useRef } from "react";
import { GiftsContext } from "../context/Context";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  Image,
  Heading,
} from "@chakra-ui/react";
import ReactToPrint from "react-to-print";

function ModalNewGift() {
  const { gifts } = useContext(GiftsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const printArea = useRef(null);

  return (
    <>
      <Button onClick={onOpen}>Preview</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody ref={printArea}>
            <Heading>To buy:</Heading>
            {gifts.map((item, index) => {
              return (
                <Box backgroundColor="brand.200" color="red.700" key={item.id}>
                  {item.gift + " : " + item.units + " : " + item.receiver}
                  <Image
                    boxSize="100px"
                    objectFit="cover"
                    src={item.picture}
                    alt="Image"
                  />
                </Box>
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

export { ModalNewGift };

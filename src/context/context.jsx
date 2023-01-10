import { createContext, useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

export const GiftsContext = createContext([]);

export const GiftsProvider = ({ children }) => {
  const [gifts, setGifts] = useState(() => {
    const savedGifts = localStorage.getItem("gifts");
    return savedGifts ? JSON.parse(savedGifts) : [];
  });

  //const [keys, setKeys] = useState([]);

  // const { isOpen, onOpen, onClose } = useDisclosure();

  const addGift = (gift) => {
    setGifts([...gifts, gift]);
  };

  const deleteGift = (index) => {
    return setGifts(gifts.filter((gift, _index) => _index !== index));
  };

  const deleteAllGifts = () => {
    return setGifts([]);
  };

  const updateGift = (id, newValues) => {
    setGifts(gifts.map((gift) => (gift.id === id ? newValues : gift)));
  };

  const totalPrice = () => {
    return gifts
      .reduce((accumulator, gift) => accumulator + gift.units * gift.price, 0)
      .toFixed(2);
  };

  useEffect(() => {
    localStorage.setItem("gifts", JSON.stringify(gifts));
  }, [gifts]);

  /*
  function handelKeyDown(e) {
    if (!keys.includes(e.key)) setKeys((keys) => [...keys, e.key]);
    if (isOpen) {
      if (
        keys.includes("s") ||
        (keys.includes("S") && keys.includes("Shift"))
      ) {
        console.log("seeee");
      }
      //return;
    }

    console.log(keys);

    if (e.key === "e" || e.key === "E") onOpen();
  }

  function handelKeyUp(e) {
    setKeys(keys.filter((key) => key === e.key));
  }

  useEffect(() => {
    window.addEventListener("keydown", handelKeyDown);
    window.addEventListener("keyup", handelKeyUp);
    return () => {
      window.removeEventListener("keydown", handelKeyDown);
      window.removeEventListener("keyup", handelKeyUp);
    };
  }, [isOpen, keys]);
  */

  return (
    <GiftsContext.Provider
      value={{
        gifts,
        addGift,
        deleteGift,
        deleteAllGifts,
        updateGift,
        totalPrice,
        //isOpen,
        //onOpen,
        //onClose,
        //keys,
        //setKeys,
      }}
    >
      {children}
    </GiftsContext.Provider>
  );
};

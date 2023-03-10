import { createContext, useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

export const GiftsContext = createContext([]);

export const GiftsProvider = ({ children }) => {
  const [gifts, setGifts] = useState(() => {
    const savedGifts = localStorage.getItem("gifts");
    return savedGifts ? JSON.parse(savedGifts) : [];
  });

  const [isRave, setIsRave] = useState(false);

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

  return (
    <GiftsContext.Provider
      value={{
        gifts,
        addGift,
        isRave,
        setIsRave,
        deleteGift,
        deleteAllGifts,
        updateGift,
        totalPrice,
      }}
    >
      {children}
    </GiftsContext.Provider>
  );
};

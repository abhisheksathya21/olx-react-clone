import { createContext, useContext, useEffect, useState } from "react";
import { fetchFromFireStore } from "../utils/firebase";

const ItemContextInternal = createContext(null);
export const ItemContext = () => useContext(ItemContextInternal);

export const ItemContextProvider = ({ children }) => {
  const [items, setItems] = useState(null);

  useEffect(() => {
    const getItems = async () => {
      const datas = await fetchFromFireStore();
      setItems(datas);
    };
    getItems();
  }, []);

  return (
    <ItemContextInternal.Provider value={{ items, setItems }}>
      {children}
    </ItemContextInternal.Provider>
  );
};

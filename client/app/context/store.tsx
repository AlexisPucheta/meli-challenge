"use client";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// in component:
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
  useEffect,
} from "react";

type DataType = {};

interface ContextProps {
  items: any;
  setSearchInput: Dispatch<SetStateAction<string>>;
  searchInput: any;
  itemSelected: any;
  setItemSelected: Dispatch<SetStateAction<string>>;
  idSelected: string;
  setIdSelected: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<ContextProps>({
  items: [],
  setSearchInput: (): string => "",
  searchInput: "",
  itemSelected: "",
  setItemSelected: (): string => "",
  idSelected: "",
  setIdSelected: (): string => "",
});

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [items, setItems] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [itemSelected, setItemSelected] = useState("");
  const [idSelected, setIdSelected] = useState("");

  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const fetchItems = async () => {
    try {
      const response = await axios({
        url: `http://localhost:3001/api/items?q=${searchInput}`,
      });
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchItem = async () => {
    try {
      const response = await axios({
        url: `http://localhost:3001/api/items/${idSelected}`,
      });
      setItemSelected(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const searchFromQueryParams = params.get("search");
    const regex = /\/items\//;
    console.log(pathname)

    if (searchFromQueryParams) setSearchInput(searchFromQueryParams)
    else if (pathname.includes('/items/')) setIdSelected(pathname.replace(regex,""))
  }, []);

  useEffect(() => {
    if (!searchInput) return;
    fetchItems();
    router.replace(`/items?search=${searchInput}`);
  }, [searchInput]);

  useEffect(() => {
    fetchItem();
    router.replace(`/items/${idSelected}`);
  }, [idSelected]);

  return (
    <GlobalContext.Provider
      value={{
        items,
        setSearchInput,
        searchInput,
        setItemSelected,
        itemSelected,
        idSelected,
        setIdSelected,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

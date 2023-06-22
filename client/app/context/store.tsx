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

interface Item {
  author: {
    name: string;
    lastname: string;
  };
  categories: string[];
  item: {
    title: string;
    condition: string;
    free_shipping: boolean;
    id: string;
    location: string;
    picture: string;
    price: {
      amount: number;
      currency: string;
      decimals: number;
    };
  };
}

interface ContextProps {
  items: Item[];
  setItems: Dispatch<SetStateAction<string>>;
  setSearchInput: Dispatch<SetStateAction<string>>;
  searchInput: string;
  itemSelected: Item | undefined;
  setItemSelected: Dispatch<SetStateAction<string>>;
  idSelected: string | undefined;
  setIdSelected: Dispatch<SetStateAction<string>>;
  breadcrumbs: string[];
}

const GlobalContext = createContext<ContextProps>({
  items: [],
  setSearchInput: (): string => "",
  setItems: ():Item[] => [],
  searchInput: "",
  itemSelected: undefined,
  setItemSelected: (): Item => [],
  idSelected: undefined,
  setIdSelected: (): string => "",
  breadcrumbs: [],
});

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [items, setItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [itemSelected, setItemSelected] = useState(undefined);
  const [idSelected, setIdSelected] = useState(undefined);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const fetchItems = async () => {
    try {
      const response = await axios({
        url: `http://localhost:3001/api/items?q=${searchInput}`,
      });
      const items = response.data as Item[];
      setItems(items);
      setBreadcrumbs(items[0].item.categories);
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
    const searchFromQueryParams = params.gets("search");
    const regex = /\/items\//;
    console.log(pathname);

    if (searchFromQueryParams) setSearchInput(searchFromQueryParams);
    else if (pathname.includes("/items/"))
      setIdSelected(pathname.replace(regex, ""));
  }, []);

  useEffect(() => {
    if (!searchInput) return;
    fetchItems();
    router.replace(`/items?search=${searchInput}`);
  }, [searchInput]);

  useEffect(() => {
    if (!idSelected) return;
    fetchItem();
    router.replace(`/items/${idSelected}`);
  }, [idSelected]);

  return (
    <GlobalContext.Provider
      value={{
        items,
        setItems,
        setSearchInput,
        searchInput,
        setItemSelected,
        itemSelected,
        idSelected,
        setIdSelected,

        breadcrumbs,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

"use client";
import { useGlobalContext } from "@/app/context/store";
import { FormEvent, useState } from "react";

export default function SearchBar() {
  const { setSearchInput } = useGlobalContext();
  const [input, setInput] = useState("");

  function handleInput(e: FormEvent<HTMLInputElement>) {
    const value = (e.target as HTMLInputElement).value;
    setInput(value);
  }

  function handleKeyDown(e: any) {
    if (e?.key === "Enter" || e.type === "click") {
      setSearchInput(input);
    }
  }
  return (
    <div className="grid grid-cols-12 px-4 gap-4 h-12 bg-[#FFE600]">
      <div className="flex my-2 col-start-2 col-span-10">
        <a href="/">
          <img src="/Logo_ML.png" width="48" height="32" alt="logo_ML"></img>
        </a>
        <div className="relative ml-2 w-full bg-white h-8 rounded-xl">
          <input
            className="pl-2 h-full w-full rounded-sm bg-white text-[#999999]"
            type="text"
            placeholder="Nunca dejes de buscar"
            onInput={handleInput}
            onKeyDown={handleKeyDown}
          />
          <button
            className="bg-[#EEEEEE] w-8 h-8 flex justify-center items-center absolute top-0 right-0 rounded-r-sm cursor-pointer"
            onClick={handleKeyDown}
          >
            <img
              src="/ic_Search.png"
              width="20"
              height="20"
              alt="icon_search"
            ></img>
          </button>
        </div>
      </div>
    </div>
  );
}

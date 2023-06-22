"use client";
import HorizontalCard from "../components/cards/horizontalCard";
import Breadcrumbs from "../components/breadcrumbs/breadcrumbs";
import { useGlobalContext } from "../context/store";

export default function Items() {
  const { items } = useGlobalContext();

  let cards: JSX.Element[] = items.map((e: any, i: number) => {
    return (
      <>
        <HorizontalCard item={e} key={e.item.id} id={e.item.id} />
        {i < 3 && <div className="h-px bg-[#EEEEEE] mx-[5%]"></div>}
      </>
    );
  });
  return (
    <>
      {items && (
        <div>
          {items[0]?.categories && (
            <Breadcrumbs categories={items[0].categories} />
          )}

          <div className="rounded-t-[4px] bg-white">{cards}</div>
        </div>
      )}
    </>
  );
}

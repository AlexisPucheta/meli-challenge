"use client";
import Breadcrumbs from "@/app/components/breadcrumbs/breadcrumbs";
import { useGlobalContext } from "@/app/context/store";

export default function Item({ params }: { params: { id: string } }) {
  const { itemSelected } = useGlobalContext();
  return (
    <>
      {itemSelected && (
        <Breadcrumbs categories={itemSelected.item.categories} />
      )}
      <div className="bg-white">
        {itemSelected && (
          <div>
            <div className="flex text-black justify-between">
              <img
                className="min-w-[680px]"
                src={itemSelected.item.picture}
              ></img>
              <div className="pt-[32px] pb-[16px] pr-[16px] max-w-[400px] text-[#333333]">
                <p className="pb-[16px]">
                  {itemSelected.item.condition === "new" && <span>Nuevo</span>}{" "}
                  - {itemSelected.item.sold_quantity} vendidos
                </p>
                <p className="text-4xl pb-[32px]">{itemSelected.item.title}</p>
                <p className="text-4xl pb-[32px]">
                  $ {itemSelected.item.price.amount}
                </p>
                <button className="bg-blue-500 w-full py-4 text-2xl text-white rounded-xl">
                  Comprar
                </button>
              </div>
            </div>
            <div className="pl-[32px] pb-[32px] w-[680px]">
              <p className="text-3xl pb-[32px] text-[#333333]">
                Descripción del producto
              </p>
              <p className="text-[#999999]">{itemSelected.item.description}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

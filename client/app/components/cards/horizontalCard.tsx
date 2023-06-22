import { useGlobalContext } from "../../context/store";

const HorizontalCard = (props: any) => {
  const { item } = props;
  const { setIdSelected } = useGlobalContext();
  return (
    <>
      <button
        className="w-full text-[#333333] p-4 block cursor-pointer"
        onClick={() => setIdSelected(item.item.id)}
      >
        <div className="flex">
          <img
            src={item.item.picture}
            className="w-[180px] h-[180px] rounded-[4px] pr-1"
          />
          <div className="flex flex-col w-full">
            <div className="flex justify-between pb-8">
              <p className="flex">
                $ {item.item.price.amount}
                {item.item.free_shipping && (
                  <img src="/ic_shipping.png" className="ml-2"></img>
                )}
              </p>
              <p>{item.item.location}</p>
            </div>
            <div className="text-left">{item.item.title}</div>
          </div>
        </div>
      </button>
    </>
  );
};

export default HorizontalCard;

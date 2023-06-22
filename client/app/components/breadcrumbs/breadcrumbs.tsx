import { useGlobalContext } from "@/app/context/store";

export default function Breadcrumbs(props: any) {
  const { categories } = props;
  const { setSearchInput } = useGlobalContext();

  let breadcrumbs: JSX.Element = categories.map(
    (category: string, index: number) => {
      return (
        <button
          className={index < categories.length - 1 ? "mr-2" : ""}
          onClick={() => setSearchInput(category)}
          key={index}
        >{`${category} ${index < categories.length - 1 ? ">" : ""}`}</button>
      );
    }
  );
  return (
    <div className="py-4 text-black">
      <ul className="flex text-[#999999]">{breadcrumbs}</ul>
    </div>
  );
}

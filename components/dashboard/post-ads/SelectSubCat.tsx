import { CommandItem } from "@/components/ui/command"
const SelectSubCat = ({
  item_2,
  index,
  handleSubSubMenuClick,
  openSubSubMenuIndex,
  onSelect,
}: any) => {
  return (
    <>
      <CommandItem key={index}>
        <div
          className="text-sm w-full"
          onClick={() => {
            handleSubSubMenuClick(index)
            onSelect(item_2.title, item_2.id, item_2.id_2)
          }}
        >
          {item_2.title}
        </div>
      </CommandItem>
      <div className="ml-8">
        {openSubSubMenuIndex === index &&
          item_2.submenu2?.map((item_3: any, index: any) => (
            <CommandItem key={index}>
              <div
                className="text-sm w-full "
                onClick={() => onSelect(item_3.title_2, item_3.id)}
              >
                {item_3.title_2}
              </div>
            </CommandItem>
          ))}
      </div>
    </>
  )
}

export default SelectSubCat

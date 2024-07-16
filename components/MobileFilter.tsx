import React from "react"
import PopUp from "./PopUp"
interface MobileFilterProps {
  closePopup: () => void
}
import Filter from "./Filter"
const MobileFilter: React.FC<MobileFilterProps> = ({ closePopup }) => {
  return (
    <PopUp closePopup={closePopup}>
      <Filter />
    </PopUp>
  )
}

export default MobileFilter

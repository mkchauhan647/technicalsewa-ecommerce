import React from "react"
interface PopUpProps {
  closePopup: () => void
  children: any
}

const PopUp: React.FC<PopUpProps> = ({ closePopup, children }) => {
  const handleBackgroundClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      closePopup()
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div
        className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
        onClick={handleBackgroundClick}
      ></div>
      <div className="relative mx-4">{children}</div>
    </div>
  )
}

export default PopUp

import React, { useState, useEffect } from "react"

const Timer = () => {
  // Calculate the time remaining until midnight
  const calculateTimeRemaining = () => {
    const now = new Date()
    const endTime = new Date()
    endTime.setHours(24, 0, 0, 0) // Set end time to midnight

    // Convert dates to timestamps (milliseconds)
    const timeRemaining = endTime.getTime() - now.getTime()

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60))
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)

    return { hours, minutes, seconds }
  }

  const [time, setTime] = useState(calculateTimeRemaining())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(calculateTimeRemaining())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="flex space-x-1 md:space-x-4 items-center justify-center">
      <span className="font-semibold text-sm md:text-base ">
        Ending In :{" "}
      </span>
      <div className="timer-box bg-red-500 text-white flex justify-center items-center px-2 md:px-0 md:w-10 h-10  rounded-sm shadow-md">
        <span className="text-sm md:text-base ">
          {String(time.hours).padStart(2, "0")}
        </span>
      </div>
      <div className="timer-box bg-red-500 text-white flex justify-center items-center px-2 md:px-0 md:w-10 h-10  rounded-sm shadow-md">
        <span className="text-sm md:text-base">
          {String(time.minutes).padStart(2, "0")}
        </span>
      </div>
      <div className="timer-box bg-red-500 text-white flex justify-center items-center px-2 md:px-0 md:w-10 h-10 rounded-sm shadow-md">
        <span className="text-sm md:text-base">
          {String(time.seconds).padStart(2, "0")}
        </span>
      </div>
    </div>
  )
}

export default Timer

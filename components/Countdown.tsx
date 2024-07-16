import React, { useEffect, useState } from "react"

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60) // 24 hours in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          return 24 * 60 * 60 // Reset to 24 hours if the time reaches 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: any) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return { hrs, mins, secs }
  }

  const time = formatTime(timeLeft)

  return (
    <div className="flex justify-center items-center space-x-2 mx-5">
      <div className="bg-blue-500 text-white text-center p-2 rounded-md">
        <span className="block text-2xl">
          {time.hrs.toString().padStart(2, "0")}
        </span>
        <p className="text-sm">Hours</p>
      </div>
      <div className="bg-blue-500 text-white text-center p-2 rounded-md">
        <span className="block text-2xl">
          {time.mins.toString().padStart(2, "0")}
        </span>
        <p className="text-sm">Mins</p>
      </div>
      <div className="bg-blue-500 text-white text-center p-2 rounded-md">
        <span className="block text-2xl">
          {time.secs.toString().padStart(2, "0")}
        </span>
        <p className="text-sm">Secs</p>
      </div>
    </div>
  )
}

export default Countdown

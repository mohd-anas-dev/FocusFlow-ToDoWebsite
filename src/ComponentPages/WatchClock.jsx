import React, { useEffect, useState } from 'react'
import "./WatchClock.css"

const WatchClock = () => {
    const [TimeCurrent, setTimeCurrent] = useState("00:00:00")
    const [DayCurrent, setDayCurrent] = useState("")
    const [DateCurrent, setDateCurrent] = useState("1 January 2000")
    
    const timeCurrent = () => {
        const timetoday = new Date()
        const hours = String(timetoday.getHours()).padStart(2,'0')
        const mins = String(timetoday.getMinutes()).padStart(2,'0')
        const secs = String(timetoday.getSeconds()).padStart(2,'0')
        setTimeCurrent(`${hours}:${mins}:${secs}`)
    }
    
    const dayCurrent = () =>{
        const daytoday = new Date()
        const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        setDayCurrent(Days[daytoday.getDay()])
    }

    const dateCurrent = () =>{
        const datetoday = new Date()
        const date = String(datetoday.getDate())
        const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const CurrMonth = Months[datetoday.getMonth()]
        const year = String(datetoday.getFullYear())
        setDateCurrent(`${date} ${CurrMonth} ${year}`)
    }

    useEffect(() => {
      timeCurrent()
      dayCurrent()
      dateCurrent()

      const interval = setInterval(() => {
        timeCurrent()
        dayCurrent()
        dateCurrent()
      }, 1000);

      return () => clearInterval(interval)
    }, [])
    


    

  return (
    <div className='Clock'>
        <div id='time'>{TimeCurrent}</div>
        <div id='day'>{DayCurrent}</div>
        <div id='date'>{DateCurrent}</div>
        
      
    </div>
  )
}

export default WatchClock









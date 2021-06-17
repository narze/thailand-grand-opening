import React, { useEffect, useState } from 'react'
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/th'
import {
  FacebookShareButton,
  LineShareButton,
  TwitterShareButton,
  FacebookIcon,
TwitterIcon,
LineIcon,
} from "react-share";

import './App.css'

dayjs.extend(relativeTime)
dayjs.locale("th")

function App() {
  const [elapsed, setElapsed] = useState("...")
  const [days, setDays] = useState("...")
  const [hours, setHours] = useState("...")
  const [minutes, setMinutes] = useState("...")
  const [seconds, setSeconds] = useState("...")

  const startTime = dayjs('2021-06-16 18:00')
  const promisedTime = dayjs('2021-06-16 18:00').add(120, 'day')

  useEffect(() => {
    const interval = setInterval(() => {
    setElapsed(dayjs().from(startTime, true))
    setDays(promisedTime.diff(dayjs(), "day").toLocaleString() + " วัน")
    setHours((promisedTime.diff(dayjs(), "hour") % 24).toLocaleString() + " ชั่วโมง")
    setMinutes((promisedTime.diff(dayjs(), "minute") % 60).toLocaleString() + " นาที")
    setSeconds((promisedTime.diff(dayjs(), "second") % 60).toLocaleString() + " วินาที")
    })

    return () => { clearInterval(interval) }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>“ผมตั้งเป้าเอาไว้ว่า ประเทศไทยจะต้องเปิดประเทศทั้งประเทศ ให้ได้ภายใน 120 วัน”</p>
        <p id="by">ลุง - 16 มิ.ย. 2564 18:00 น.</p>
        <p>
          ตอนนี้ผ่านมาแล้ว {elapsed} ลุงเหลือเวลา...
        </p>
        <p id="remaining">
          {days}
        </p>
        <p id="remaining-detail">
          {hours} {minutes} {seconds}
        </p>
        <p id="social">
          <FacebookShareButton
            url="https://thailand-grand-opening.web.app/"
            quote={`ลุงเหลือเวลา ${days} ในการเปิดประเทศ`}>
            <FacebookIcon size={46} />
          </FacebookShareButton>
          <TwitterShareButton
            url="https://thailand-grand-opening.web.app/"
            title={`ลุงเหลือเวลา ${days} ในการเปิดประเทศ`}
          >
            <TwitterIcon size={46} />
          </TwitterShareButton>
          <LineShareButton url="https://thailand-grand-opening.web.app/">
            <LineIcon size={46} />
          </LineShareButton>
        </p>
      </header>
    </div>
  )
}

export default App

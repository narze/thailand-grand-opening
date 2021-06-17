import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/th";
import {
  FacebookShareButton,
  LineShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LineIcon,
} from "react-share";

import "./App.css";

dayjs.extend(relativeTime);
dayjs.locale("th");

function App() {
  const modes = ["subordinate", "uncle", "barristor"];
  const [currentMode, setCurrentMode] = useState(modes[0]);
  const uncleMode = useMemo(() => currentMode == "uncle", [currentMode]);
  const subordinateMode = useMemo(
    () => currentMode == "subordinate",
    [currentMode]
  );
  const barristorMode = useMemo(
    () => currentMode == "barristor",
    [currentMode]
  );
  const [elapsed, setElapsed] = useState("...");
  const [days, setDays] = useState("...");
  const [hours, setHours] = useState("...");
  const [minutes, setMinutes] = useState("...");
  const [seconds, setSeconds] = useState("...");

  const uncleSaidTime = dayjs("2021-06-16T18:00:00+07:00");
  const actualStartTime = dayjs("2021-07-01T00:00:00+07:00");
  const luffyTime = dayjs("2021-12-16T00:00:00+07:00");

  function cycleMode() {
    const currentModeIndex = modes.indexOf(currentMode);
    setCurrentMode(modes[(currentModeIndex + 1) % modes.length]);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(dayjs().from(uncleSaidTime, true));

      let promisedTime;

      if (uncleMode) {
        promisedTime = uncleSaidTime.add(120, "day");
      } else if (subordinateMode) {
        promisedTime = actualStartTime.add(120, "day");
      } else {
        promisedTime = luffyTime;
      }

      setDays(promisedTime.diff(dayjs(), "day").toLocaleString() + " วัน");
      setHours(
        (promisedTime.diff(dayjs(), "hour") % 24).toLocaleString() + " ชั่วโมง"
      );
      setMinutes(
        (promisedTime.diff(dayjs(), "minute") % 60).toLocaleString() + " นาที"
      );
      setSeconds(
        (promisedTime.diff(dayjs(), "second") % 60).toLocaleString() + " วินาที"
      );
    });

    return () => {
      clearInterval(interval);
    };
  }, [currentMode]);

  return (
    <div className="App">
      <header className="App-header">
        {uncleMode && (
          <>
            <p>
              “ผมตั้งเป้าเอาไว้ว่า ประเทศไทยจะต้องเปิดประเทศทั้งประเทศ
              ให้ได้ภายใน 120 วัน”
            </p>
            <p id="by">ลุง - 16 มิ.ย. 2564 18:00 น.</p>
          </>
        )}
        {subordinateMode && (
          <>
            <p>
              <s>
                “ผมตั้งเป้าเอาไว้ว่า ประเทศไทยจะต้องเปิดประเทศทั้งประเทศ
                ให้ได้ภายใน 120 วัน”
              </s>
            </p>
            <p>ลูกน้องลุง : ลุงพูดผิด จริงๆ แล้วจะเริ่ม 1 ก.ค. จ้า</p>
          </>
        )}
        {barristorMode && (
          <>
            <p>
              “ภายใน 120 วัน เริ่มนับตั้งแต่ 1 ก.ค. <u>แต่ไม่นับวันหยุด</u>”
            </p>
            <p id="by">
              ดักไว้ก่อน กูรู้นะไอ้สัสว่ามึงจะเล่นมุกนี้ #มิตรสหายท่านหนึ่ง
            </p>
          </>
        )}

        <a id="toggleMode" onClick={() => cycleMode()}>
          Mode :{" "}
          {uncleMode
            ? "เชื่อลุงดีกว่า"
            : subordinateMode
            ? "ฟังลูกน้องลุง"
            : "เนติบริกรแถวบ้าน"}
        </a>

        <p>ตอนนี้ผ่านมาแล้ว {elapsed} ลุงเหลือเวลา...</p>
        <p id="remaining">{days}</p>
        <p id="remaining-detail">
          {hours} {minutes} {seconds}
        </p>
        <p id="social">
          <FacebookShareButton
            url="https://thailand-grand-opening.web.app/"
            quote={`ลุงเหลือเวลา ${days} ในการเปิดประเทศ`}
          >
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
  );
}

export default App;

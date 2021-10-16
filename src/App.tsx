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
import Progress from "./components/progress";
import Footer from "./components/footer";

dayjs.extend(relativeTime);
dayjs.locale("th");

function App() {
  const modes = ["uncle", "subordinate", "spokesperson", "barristor"];
  const [currentMode, setCurrentMode] = useState(modes[0]);
  const [late, setLate] = useState(false);
  const uncleMode = useMemo(() => currentMode == "uncle", [currentMode]);
  // const subordinateMode = useMemo(
  //   () => currentMode == "subordinate",
  //   [currentMode]
  // );
  // const barristorMode = useMemo(
  //   () => currentMode == "barristor",
  //   [currentMode]
  // );
  // const spokespersonMode = useMemo(
  //   () => currentMode == "spokesperson",
  //   [currentMode]
  // );
  const [elapsed, setElapsed] = useState("...");
  const [days, setDays] = useState("...");
  const [hours, setHours] = useState("...");
  const [minutes, setMinutes] = useState("...");
  const [seconds, setSeconds] = useState("...");
  const [progress, setProgress] = useState(0);

  const uncleSaidTime = dayjs("2021-06-16T18:00:00+07:00");
  const actualStartTime = dayjs("2021-07-01T00:00:00+07:00");
  const luffyTime = dayjs("2021-12-16T00:00:00+07:00");

  function cycleMode() {
    const currentModeIndex = modes.indexOf(currentMode);
    setCurrentMode(modes[(currentModeIndex + 1) % modes.length]);
  }

  function buttonLabel() {
    switch (currentMode) {
      case "spokesperson":
        return "3. โฆษกลุง";
      case "subordinate":
        return "2. ฟังลูกน้องลุง";
      case "uncle":
        return "1. เชื่อลุงดีกว่า";
      case "barristor":
        return "?. เนติบริกรแถวบ้าน";
      default:
        break;
    }
  }

  useEffect(() => {
    const updateCounter = () => {
      let now = dayjs();
      setElapsed(now.from(uncleSaidTime, true));

      let promisedTime;

      switch (currentMode) {
        case "spokesperson":
          promisedTime = uncleSaidTime;
          break;
        case "subordinate":
          promisedTime = actualStartTime.add(120, "day");
          break;
        case "uncle":
          promisedTime = uncleSaidTime.add(120, "day");
          break;
        case "barristor":
          promisedTime = luffyTime;
          break;
        default:
          promisedTime = uncleSaidTime.add(120, "day");
          break;
      }

      let totalDays = promisedTime.diff(uncleSaidTime, "day");
      let elapsedDays = now.diff(uncleSaidTime, "day");

      if (promisedTime < now) {
        setLate(true)
      }
      // if (spokespersonMode) {
      //   totalDays = 120;
      //   [now, promisedTime] = [promisedTime, now];
      // }

      setDays(Math.abs(promisedTime.diff(now, "day")).toLocaleString() + " วัน");
      setHours(
        (Math.abs(promisedTime.diff(now, "hour")) % 24).toLocaleString() + " ชั่วโมง"
      );
      setMinutes(
        (Math.abs(promisedTime.diff(now, "minute")) % 60).toLocaleString() + " นาที"
      );
      setSeconds(
        (Math.abs(promisedTime.diff(now, "second")) % 60).toLocaleString() + " วินาที"
      );

      const handicap = 5;

      setProgress(
        Math.min(1, (elapsedDays + handicap) / (totalDays + handicap))
      );

      return updateCounter;
    };

    const interval = setInterval(updateCounter(), 1000);

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
        {/* {subordinateMode && (
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
        {spokespersonMode && (
          <>
            <p>
              <s>
                “ผมตั้งเป้าเอาไว้ว่า ประเทศไทยจะต้องเปิดประเทศทั้งประเทศ
                ให้ได้ภายใน 120 วัน”
              </s>
            </p>
            <p>
              โฆษกลุง : 120 วันเป็นแค่หลักการ ไม่ใช่เรื่องกดปุ่ม{" "}
              <u>ไม่ใช่การเคาท์ดาวน์</u>
            </p>
          </>
        )}

        <p>
          <a id="toggleMode" onClick={() => cycleMode()}>
            {buttonLabel()}
          </a>
          {spokespersonMode && (
            <span id="thisIsNotButton">{"⬅ นี่ไม่ใช่ปุ่ม"}</span>
          )}
        </p>*/

          <p>
            {late ? `ตอนนี้ผ่านมาแล้ว ${elapsed} ซึ่งเลยมาแล้ว...` : `ตอนนี้ผ่านมาแล้ว ${elapsed} ลุงเหลือเวลา...`}
          </p>}
        <p id="remaining">{days}</p>
        <p id="remaining-detail">
          {hours} {minutes} {seconds}
        </p>

        <Progress animate={progress} />

        <p id="social">
          <span>แชร์</span>
          <span>
            <FacebookShareButton
              url="https://thailand-grand-opening.web.app/"
              quote={`ลุงเหลือเวลา ${days} ในการเปิดประเทศ`}
            >
              <FacebookIcon size={46} />
            </FacebookShareButton>
          </span>
          <span>
            <TwitterShareButton
              url="https://thailand-grand-opening.web.app/"
              title={`ลุงเหลือเวลา ${days} ในการเปิดประเทศ`}
            >
              <TwitterIcon size={46} />
            </TwitterShareButton>
          </span>
          <span>
            <LineShareButton url="https://thailand-grand-opening.web.app/">
              <LineIcon size={46} />
            </LineShareButton>
          </span>
        </p>

        <Footer />
      </header>
    </div>
  );
}

export default App;

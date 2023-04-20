import React, { useCallback, useEffect } from "react";
import { useTimer } from "react-timer-hook";

export default function MyTimer({ expiryTimestamp, onExpire, showZeroTimer }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    // isRunning,
    // start,
    // pause,
    // resume,
    // restart,
  } = useTimer({
    expiryTimestamp,
    // onExpire: onExpire ? onExpire() : () => console.warn("onExpire called"),
  });

  const formatTime = (time) => {
    return String(time).padStart(2, "0");
  };

  const handleExpiry = useCallback(() => {
    const sumOfTimeDigits = [seconds, minutes, hours, days].reduce(
      (a, b) => a + b,
      0
    );

    if (sumOfTimeDigits < 3) onExpire();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, minutes, hours, days]);

  useEffect(() => {
    handleExpiry();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, minutes, hours, days]);

  return (
    <div className="timeCounter">
      <div>
        <span>
          {formatTime(showZeroTimer ? 0 : days)}
          <p>DAYS</p>
        </span>
        <span>
          {formatTime(showZeroTimer ? 0 : hours)}
          <p>HOURS</p>
        </span>
        <span>
          {formatTime(showZeroTimer ? 0 : minutes)}
          <p>MINUTES</p>
        </span>
        <span>
          {formatTime(showZeroTimer ? 0 : seconds)}
          <p>SECONDS</p>
        </span>
      </div>
      {/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}
      {/* <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button onClick={() => {
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 300);
        restart(time)
      }}>Restart</button> */}
    </div>
  );
}

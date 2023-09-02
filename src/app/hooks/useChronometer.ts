"use client";

import { use, useEffect, useRef } from "react";
import { Chronometer, Status } from "../utils/chronometer";

export const useChronometer = (
  status: Status,
  startTime: number,
  stopTime: number
) => {
  const chronometer = useRef(new Chronometer(status, startTime, stopTime));

  useEffect(() => {
    chronometer.current.status = status;
    chronometer.current.startTime = startTime;
    chronometer.current.stopTime = stopTime;
  }, [startTime, status, stopTime]);

  return chronometer.current;
};

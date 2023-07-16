"use client";

import { useRef } from "react";
import { Chronometer } from "../utils/chronometer";

export const useChronometer = () => {
  return useRef(new Chronometer()).current;
};

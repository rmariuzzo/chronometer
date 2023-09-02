import useLocalStorageState from "use-local-storage-state";
import { Chronometer } from "../utils/chronometer";

type State = {
  theme: "light" | "dark";
  chronometer: {
    startTime: Chronometer["startTime"];
    stopTime: Chronometer["stopTime"];
    status: Chronometer["status"];
  };
};

const defaultState: State = {
  theme: "light",
  chronometer: {
    startTime: 0,
    stopTime: 0,
    status: "idle",
  },
};

export const useLocalStoredState = () => {
  const [state, setState] = useLocalStorageState<State>("state", {
    defaultValue: defaultState,
  });

  return [state, setState] as const;
};

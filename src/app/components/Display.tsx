import { FC, useCallback, useLayoutEffect, useRef, useState } from "react";

import { useChronometer } from "../hooks/useChronometer";
import { useLocalStoredState } from "../hooks/useLocalStoredState";

import styles from "./Display.module.css";

export const Display: FC = () => {
  const [state, setState] = useLocalStoredState();
  const chronometer = useChronometer(
    state.chronometer.status,
    state.chronometer.startTime,
    state.chronometer.stopTime
  );
  const [ellapsed, setEllapsed] = useState(chronometer.ellapsed());
  const [movementTimedOut, setMovementTimedOut] = useState(true);
  const movementTimeoutId = useRef<NodeJS.Timeout>();

  const persistChronometer = useCallback(() => {
    if (chronometer.startTime === 0) return;
    setState({
      ...state,
      chronometer: {
        startTime: chronometer.startTime,
        stopTime: chronometer.stopTime,
        status: chronometer.status,
      },
    });
  }, [
    chronometer.startTime,
    chronometer.status,
    chronometer.stopTime,
    setState,
    state,
  ]);

  useLayoutEffect(() => {
    setInterval(() => {
      setEllapsed(chronometer.ellapsed());
    }, 1000 / 60);
  }, [chronometer, persistChronometer]);

  const handleContainerClick = () => {
    chronometer.toggle();
    persistChronometer();
  };

  const handleContainerDoubleClick = () => {
    chronometer.reset();
    persistChronometer();
  };

  const handleContainerContextMenu = () => {
    setState({ ...state, theme: state.theme === "light" ? "dark" : "light" });
  };

  const handleContainerMouseMove = () => {
    if (movementTimedOut) {
      setMovementTimedOut(false);
    }
    clearTimeout(movementTimeoutId.current);
    movementTimeoutId.current = setTimeout(() => {
      setMovementTimedOut(true);
    }, 2000);
  };

  return (
    <div
      className={[
        styles.container,
        state.theme === "dark" ? styles.darkMode : "",
      ].join(" ")}
      onClick={handleContainerClick}
      onDoubleClick={handleContainerDoubleClick}
      onContextMenu={(event) => {
        event.preventDefault();
        handleContainerContextMenu();
      }}
      onMouseMove={handleContainerMouseMove}
    >
      <div className={styles.display}>{ellapsed}</div>
      <header
        className={[styles.header, movementTimedOut ? styles.hidden : ""].join(
          " "
        )}
      >
        Click = start/stop. Double click = reset. Right click = dark/light mode.
      </header>
      <footer
        className={[styles.footer, movementTimedOut ? styles.hidden : ""].join(
          " "
        )}
      >
        @rmariuzzo
      </footer>
    </div>
  );
};

import { FC, useLayoutEffect, useRef, useState } from "react";
import { useChronometer } from "../hooks/useChronometer";
import styles from "./Display.module.css";

export const Display: FC = () => {
  const chronometer = useChronometer();
  const [ellapsed, setEllapsed] = useState(chronometer.ellapsed());
  const [darkMode, setDarkMode] = useState(false);
  const [movementTimedOut, setMovementTimedOut] = useState(true);
  const movementTimeoutId = useRef<NodeJS.Timeout>();

  useLayoutEffect(() => {
    setInterval(() => {
      setEllapsed(chronometer.ellapsed());
    }, 1000 / 60);
  }, []);

  const handleContainerClick = () => {
    chronometer.toggle();
  };

  const handleContainerDoubleClick = () => {
    chronometer.reset();
  };

  const handleContainerContextMenu = () => {
    setDarkMode(!darkMode);
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
      className={[styles.container, darkMode ? styles.darkMode : ""].join(" ")}
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

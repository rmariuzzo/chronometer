export type Status = "idle" | "started" | "stopped";

export class Chronometer {
  status: Status = "idle";
  startTime = 0;
  stopTime = 0;

  constructor(status: Status, startTime: number, stopTime: number) {
    this.status = status;
    this.startTime = startTime;
    this.stopTime = stopTime;
  }

  start = () => {
    if (this.status === "idle") {
      this.startTime = Date.now();
      this.stopTime = 0;
      this.status = "started";
    } else if (this.status === "stopped") {
      this.startTime = Date.now() - (this.stopTime - this.startTime);
      this.stopTime = 0;
      this.status = "started";
    }
  };

  stop = () => {
    if (this.status === "started") {
      this.status = "stopped";
      this.stopTime = Date.now();
    }
  };

  toggle = () => {
    if (this.status === "started") {
      this.stop();
    } else {
      this.start();
    }
  };

  reset = () => {
    this.status = "idle";
    this.startTime = 0;
    this.stopTime = 0;
  };

  ellapsed = () => {
    const ellapsed = this.#ellapsed();
    const remainingMillis = ellapsed % 1000;
    const formattedMillis = String(remainingMillis)
      .padStart(3, "0")
      .substring(0, 1);

    const seconds = Math.floor(ellapsed / 1000);
    const remainingSeconds = seconds % 60;
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    const minutes = Math.floor(seconds / 60);
    const remainingMinutes = minutes % 60;
    const formattedMinutes = String(remainingMinutes).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}:${formattedMillis}`;
  };

  #ellapsed = () => {
    return this.status === "idle"
      ? 0
      : (this.stopTime || Date.now()) - this.startTime;
  };
}

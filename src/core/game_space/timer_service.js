class TimerService {
  constructor() {
    /**
     * @type {{
     * timer: NodeJS.Timeout,
     * defaultFrequency: number}}
     */
    this.internal = {};

    this.internal.timer = undefined;
    this.internal.defaultFrequency = 30;
  }

  stop() {
    if (!this.internal.timer) return;

    clearInterval(this.internal.timer);
    this.internal.timer = undefined;
  }

  /**
   * @param {TimerHandler} handler
   */
  start(handler) {
    this.internal.timer = setInterval(handler, this.internal.defaultFrequency);
  }
}

export default TimerService;

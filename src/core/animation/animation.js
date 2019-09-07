import Observable from '../observable';

/**
 * @typedef {import('./frame').default} Frame
 */

export default class Animation {
  /**
   * Frame that is shown now
   * @type {Frame}
   */
  get currentFrame() {
    return this.internal.currentFrame;
  }

  /**
   * Sets the current frame of animation
   * @param {Frame} val
   */
  set currentFrame(val) {
    this.internal.currentFrame = val;
    this.internal.currentFrameChanged.fire(this, this.currentFrame);
  }

  /**
   * Fires when the current frame was changed
   * @returns {Observable}
   */
  get currentFrameChanged() {
    return this.internal.currentFrameChanged;
  }

  /**
   * Animation name
   * @type {string}
   */
  get name() {
    return this.internal.name;
  }

  /**
   * @param {string} animationName Animation name
   * @param {Frame[]} frameArray Frame array
   * @param {boolean} repeatAnimation Repeat animation after played
   * @param {number} rate Miliseconds between frames
   */
  constructor(animationName, frameArray, repeatAnimation, rate) {
    /**
     * @private
     */
    this.internal = {
      /**
       * @type {Frame[]}
       */
      frames: frameArray,
      /**
       * @type {Frame}
       */
      currentFrame: undefined,
      /**
       * @type {boolean}
       */
      repeat: repeatAnimation,
      /**
       * @type {number}
       */
      frameRate: rate,
      /**
       * @type {NodeJS.Timeout}
       */
      timer: undefined,
      /**
       * @param {string}
       */
      name: animationName,
      /**
       * @type {Observable}
       */
      currentFrameChanged: new Observable(),
    };
  }

  /**
   * Start/continue playing this animation
   */
  play() {
    if (this.internal.timer) return;

    this.internal.timer = setInterval(() => {
      let nextFrameIndex;
      if (this.internal.currentFrame) {
        nextFrameIndex = this.internal.frames.indexOf(this.internal.currentFrame) + 1;
        if (nextFrameIndex >= this.internal.frames.length) {
          if (this.internal.repeat) {
            nextFrameIndex = 0;
          } else {
            this.stop();
          }
        }
      } else {
        nextFrameIndex = 0;
      }

      this.currentFrame = this.internal.frames[nextFrameIndex];
    }, this.internal.frameRate);
  }

  /**
   * Stop playing this animation
   */
  stop() {
    if (!this.internal.timer) return;

    clearInterval(this.internal.timer);
    this.internal.timer = undefined;
  }
}

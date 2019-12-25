import Observable from '../observable';

/**
 * @typedef {import('./frame').default} Frame
 */
class Animation {
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
   * @param {string} name Animation name
   * @param {Frame[]} frames Frame array
   * @param {boolean} repeat Repeat animation after played
   * @param {number} rate Miliseconds between frames
   */
  constructor(name, frames, repeat, rate) {
    /**
     * @private
     * @type {{
     * frames: Frame[],
     * currentFrame: Frame,
     * repeat: boolean,
     * frameRate: number,
     * timer: NodeJS.Timeout,
     * name: string,
     * currentFrameChanged: Observable
     * }}
     */
    this.internal = {};

    this.internal.frames = frames;
    this.internal.currentFrame = undefined;
    this.internal.repeat = repeat;
    this.internal.frameRate = rate;
    this.internal.timer = undefined;
    this.internal.name = name;
    this.internal.currentFrameChanged = new Observable();
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

export default Animation;

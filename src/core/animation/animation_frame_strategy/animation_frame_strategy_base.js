/**
 * @typedef {import('../animation').default} Animation
 * @typedef {import('../frame').default} Frame
 */
class AnimationFrameStrategyBase {
  /**
   * @param {Animation} repeat
   */
  constructor(animation) {
    /**
     * @type {{
     * animation: Animation}
     */
    this.internal = {};

    this.internal.animation = animation;
  }

  /**
   * @returns {Frame}
   */
  getFrame() {
    throw new Error(`getFrame is not implemented in '${this.constructor.name}' class`);
  }

  /**
   * @returns {number}
   */
  getFrameRate() {
    const frame = this.getFrame();

    return frame && frame.frameRate !== undefined
      ? frame.frameRate
      : this.internal.animation.frameRate;
  }
}

export default AnimationFrameStrategyBase;

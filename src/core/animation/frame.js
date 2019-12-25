/**
 * @typedef {import('../point').default} Point
 */
class Frame {
  /**
   * Offset point relative to sprite
   * @type {Point}
   */
  get offset() {
    return this.inernal.offset;
  }

  /**
   * Width of frame
   * @type {number}
   */
  get width() {
    return this.inernal.width;
  }

  /**
   * Height of frame
   * @type {number}
   */
  get height() {
    return this.inernal.height;
  }

  /**
   * @param {Point} offset Offset point relative to sprite
   * @param {number} width Width of frame
   * @param {number} height Height of frame
   */
  constructor(offset, width, height) {
    /**
     * @private
     */
    this.inernal = {
      offset,
      width,
      height,
    };
  }
}

export default Frame;

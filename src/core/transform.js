import Observable from './observable';

/**
 * @typedef {import('./point').default} Point
 */
class Transform {
  get position() {
    return this.internal.position;
  }

  set position(val) {
    this.internal.position = val;
    this.internal.positionChanged.fire(this);
  }

  get positionChanged() {
    return this.internal.positionChanged;
  }

  get width() {
    return this.internal.width;
  }

  get height() {
    return this.internal.height;
  }

  /**
   * @param {Point} position
   * @param {number} width
   * @param {number} height
   */
  constructor(position, width, height) {
    /**
     * @private
     * @type {{
     * position: Point,
     * positionChanged: Observable,
     * width: number,
     * height: number
     * }}
     */
    this.internal = {};

    this.internal.position = position;
    this.internal.positionChanged = new Observable();

    this.internal.width = width;
    this.internal.height = height;
  }
}

export default Transform;

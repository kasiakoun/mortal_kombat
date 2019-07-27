import Observable from '../observable';
import Point from '../point';

/**
 * A base class for units
 */
export default class UnitBase {
  /**
   * Sets the current position of unit
   * @param {Point} val
   */
  set position(val) {
    this.internal.position = val;
    this.internal.positionChanged.fire();
  }

  /**
   * Gets the current position of unit
   * @returns {Point}
   */
  get position() {
    return this.internal.position;
  }

  /**
   * Fires when this unit changed his positioin
   * @returns {Observable}
   */
  get positionChanged() {
    return this.internal.positionChanged;
  }

  constructor() {
    /**
     * @private
     */
    this.internal = {
      /**
       * @type {Point}
       */
      position: new Point(0, 0),
      /**
       * @type {Observable}
       */
      positionChanged: new Observable(),
    };
    this.width = 0;
    this.height = 0;
  }
}

import Point from '../point';

/**
 * @typedef {import('../units/unit_base').default} UnitBase
 */

export default class MoveController {
  /**
   * @param {UnitBase} unitBase
   */
  constructor(unitBase) {
    /**
     * @private
     */
    this.internal = {
      /**
       * @type {UnitBase}
       */
      unit: unitBase,
      /**
       * @type {NodeJS.Timeout}
       */
      timer: undefined,
      /**
       * @type {number}
       */
      frequency: 30,
      /**
       * @type {number}
       */
      forwardStep: 3,
      /**
       * @type {number}
       */
      backwardStep: 2,
    };
  }

  moveForward() {
    if (this.internal.timer) this.stop();

    this.internal.timer = setInterval(() => {
      const unitPosition = this.internal.unit.position;

      const currentX = unitPosition.x + this.internal.forwardStep;
      const currentY = unitPosition.y;

      this.internal.unit.position = new Point(currentX, currentY);
    }, this.internal.frequency);
  }

  moveBackward() {
    if (this.internal.timer) this.stop();

    this.internal.timer = setInterval(() => {
      const unitPosition = this.internal.unit.position;

      const currentX = unitPosition.x - this.internal.backwardStep;
      const currentY = unitPosition.y;

      this.internal.unit.position = new Point(currentX, currentY);
    }, this.internal.frequency);
  }

  stop() {
    if (!this.internal.timer) return;

    clearInterval(this.internal.timer);
    this.internal.timer = undefined;
  }
}

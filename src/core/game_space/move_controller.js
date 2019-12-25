import Point from '../point';

/**
 * @typedef {import('../entities/units/unit_base').default} UnitBase
 */

class MoveController {
  /**
   * @param {UnitBase} unit
   */
  constructor(unit) {
    /**
     * @private
     * @type {{
     * unit: UnitBase,
     * timer: NodeJS.Timeout,
     * frequency: number,
     * forwardStep: number,
     * backwardStep: number
     * }}
     */
    this.internal = {};

    this.internal.unit = unit;
    this.internal.timer = undefined;
    this.internal.frequency = 30;
    this.internal.forwardStep = 3;
    this.internal.backwardStep = 2;
  }

  moveForward() {
    if (this.internal.timer) this.stop();

    this.internal.timer = setInterval(() => {
      const unitPosition = this.internal.unit.transform.position;

      const currentX = unitPosition.x + this.internal.forwardStep;
      const currentY = unitPosition.y;

      this.internal.unit.transform.position = new Point(currentX, currentY);
    }, this.internal.frequency);
  }

  moveBackward() {
    if (this.internal.timer) this.stop();

    this.internal.timer = setInterval(() => {
      const unitPosition = this.internal.unit.transform.position;

      const currentX = unitPosition.x - this.internal.backwardStep;
      const currentY = unitPosition.y;

      this.internal.unit.transform.position = new Point(currentX, currentY);
    }, this.internal.frequency);
  }

  stop() {
    if (!this.internal.timer) return;

    clearInterval(this.internal.timer);
    this.internal.timer = undefined;
  }
}

export default MoveController;

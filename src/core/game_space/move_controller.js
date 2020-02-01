import Point from '../point';

/**
 * @typedef {import('../entities/units/unit_base').default} UnitBase
 * @typedef {import('./move_enabler').default} MoveEnabler
 */
class MoveController {
  /**
   * @param {UnitBase} unit
   * @param {MoveEnabler} moveEnabler
   */
  constructor(unit, moveEnabler) {
    /**
     * @private
     * @type {{
     * unit: UnitBase,
     * moveEnabler: MoveEnabler,
     * timer: NodeJS.Timeout,
     * frequency: number,
     * forwardStep: number,
     * backwardStep: number
     * }}
     */
    this.internal = {};

    this.internal.unit = unit;
    this.internal.moveEnabler = moveEnabler;
    this.internal.timer = undefined;
    this.internal.frequency = 30;
    // todo: будет сделан механизм для поворта unit'а
    this.internal.forwardStep = 3;
    // todo: будет сделан механизм для поворта unit'а
    this.internal.backwardStep = -2;
  }

  /**
   * @param {number} xOffeset
   */
  move(xOffeset) {
    if (this.internal.timer) this.stop();

    this.internal.timer = setInterval(() => {
      const unitPosition = this.internal.unit.transform.position;

      const currentX = unitPosition.x + xOffeset;
      const currentY = unitPosition.y;

      const currentPosition = new Point(currentX, currentY);
      if (this.internal.moveEnabler.canMove(this.internal.unit, currentPosition)) {
        this.internal.unit.transform.position = new Point(currentX, currentY);
      }
    }, this.internal.frequency);
  }

  moveForward() {
    this.move(this.internal.forwardStep);
  }

  moveBackward() {
    this.move(this.internal.backwardStep);
  }

  stop() {
    if (!this.internal.timer) return;

    clearInterval(this.internal.timer);
    this.internal.timer = undefined;
  }
}

export default MoveController;

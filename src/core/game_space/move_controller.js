import Point from '../point';

/**
 * @typedef {import('../entities/units/unit_base').default} UnitBase
 * @typedef {import('./move_enabler').default} MoveEnabler
 * @typedef {import('./timer_service').default} TimerService
 */
class MoveController {
  /**
   * @param {UnitBase} unit
   * @param {MoveEnabler} moveEnabler
   * @param {TimerService} movingTimerService
   */
  constructor(unit, moveEnabler, movingTimerService) {
    /**
     * @private
     * @type {{
     * unit: UnitBase,
     * moveEnabler: MoveEnabler,
     * movingTimerService: TimerService,
     * forwardStep: number,
     * backwardStep: number
     * }}
     */
    this.internal = {};

    this.internal.unit = unit;
    this.internal.moveEnabler = moveEnabler;
    this.internal.movingTimerService = movingTimerService;

    // todo: make mechanism  for unit's turning
    this.internal.forwardStep = 3;
    // todo: make mechanism  for unit's turning
    this.internal.backwardStep = -2;
  }

  /**
   * @param {number} xOffeset
   * @param {number} yOffset
   */
  move(xOffeset, yOffset) {
    this.internal.movingTimerService.stop();

    this.internal.movingTimerService.start(() => {
      const unitPosition = this.internal.unit.transform.position;

      const currentX = unitPosition.x + xOffeset;
      const currentY = unitPosition.y + yOffset;

      this.moveToPosition(currentX, currentY);
    });
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  moveToPosition(x, y) {
    // todo: add checker for Y-coor in the future and for both of them
    if (this.internal.moveEnabler.canMoveByX(this.internal.unit, x)) {
      this.internal.unit.transform.position = new Point(x, y);
    } else {
      this.internal.unit.transform.position = new Point(this.internal.unit.transform.position.x, y);
    }
  }

  moveForward() {
    this.move(this.internal.forwardStep, 0);
  }

  moveBackward() {
    this.move(this.internal.backwardStep, 0);
  }

  stop() {
    this.internal.movingTimerService.stop();
  }
}

export default MoveController;

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
    const currentPosition = new Point(x, y);
    if (this.internal.moveEnabler.canMove(this.internal.unit, currentPosition)) {
      this.internal.unit.transform.position = currentPosition;
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

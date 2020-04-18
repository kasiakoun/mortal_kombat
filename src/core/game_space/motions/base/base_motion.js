/**
 * @typedef {import('../../move_controller').default} MoveController
 * @typedef {import('../../../converters/coordinate_converter').default} CoordinateConverter
 * @typedef {import('../../timer_service').default} TimerService
 * @typedef {import('../../../point').default} Point
 * @typedef {import('../../../transform').default} Transform
 */
class BaseMotion {
  /**
   * @param {MoveController} moveController
   * @param {CoordinateConverter} coordinateConverter
   * @param {TimerService} timerService
   * @param {Transform} unitTransform
   */
  constructor(moveController, coordinateConverter, timerService, unitTransform) {
    /**
     * @type {{
     * moveController: MoveController,
     * coordinateConverter: CoordinateConverter,
     * timerService: TimerService,
     * unitTransform: Transform,
     * initialCartesianPosition: Point}}
     */
    this.internal = {};

    this.internal.moveController = moveController;
    this.internal.coordinateConverter = coordinateConverter;
    this.internal.timerService = timerService;
    this.internal.unitTransform = unitTransform;

    this.internal.initialCartesianPosition = undefined;
  }

  start() {
    throw new Error(`start is not implemented in '${this.constructor.name}' class`);
  }

  stop() {
    this.internal.timerService.stop();
  }

  /**
   * @param {number} elapsedTime
   * @returns {Point}
   */
  calculate(elapsedTime) {
    throw new Error(`calculate is not implemented in '${this.constructor.name}' class`);
  }
}

export default BaseMotion;

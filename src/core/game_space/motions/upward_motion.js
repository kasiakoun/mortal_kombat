import NonCyclicMotion from './base/non_cyclic_motion';
import Physics from '../../physics';
import Point from '../../point';

/**
 * @typedef {import('../move_controller').default} MoveController
 * @typedef {import('../../converters/coordinate_converter').default} CoordinateConverter
 * @typedef {import('../timer_service').default} TimerService
 * @typedef {import('../../transform').default} Transform
 */
class UpwardMotion extends NonCyclicMotion {
  /**
   * @param {MoveController} moveController
   * @param {CoordinateConverter} coordinateConverter
   * @param {TimerService} timerService
   * @param {Transform} unitTransform
   * @param {number} velocity
   */
  constructor(moveController, coordinateConverter, timerService, unitTransform, velocity) {
    super(moveController, coordinateConverter, timerService, unitTransform);
    /**
     * @type {{
     * velocity: number,
     * initialCartesianPosition: Point}}
     */
    this.internal = Object.assign({}, this.internal);

    this.internal.velocity = velocity;
  }

  /**
   * @param {number} elapsedTime Elapsed time in seconds
   * @returns {Point}
   */
  calculate(elapsedTime) {
    const calibratedElapsedTime = elapsedTime * 13;
    let cartesianY = Physics.calculateUniformlyAcceleratedRectilinearMotion(this.internal.velocity,
      calibratedElapsedTime, this.internal.initialCartesianPosition.y);

    if (this.internal.initialCartesianPosition.y >= cartesianY) {
      cartesianY = this.internal.initialCartesianPosition.y;
    }

    return new Point(this.internal.initialCartesianPosition.x, cartesianY);
  }

  /**
   * @param {Point} currentCartesianPosition
   * @param {number} elapsedTime
   * @returns {boolean}
   */
  isFinalStep(currentCartesianPosition, elapsedTime) {
    return this.internal.initialCartesianPosition.y >= currentCartesianPosition.y;
  }
}

export default UpwardMotion;

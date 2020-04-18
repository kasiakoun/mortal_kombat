import CyclicMotion from './base/cyclic_motion';
import Physics from '../../physics';
import Point from '../../point';

/**
 * @typedef {import('../move_controller').default} MoveController
 * @typedef {import('../../converters/coordinate_converter').default} CoordinateConverter
 * @typedef {import('../timer_service').default} TimerService
 * @typedef {import('../../transform').default} Transform
 */
class StraightMotion extends CyclicMotion {
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
     * velocity: number}}
     */
    this.internal = Object.assign({}, this.internal);

    this.internal.velocity = velocity;
  }

  /**
   * @param {Point} cartesianPosition
   * @param {number} elapsedTime Elapsed time in seconds
   * @returns {Point}
   */
  calculate(cartesianPosition, elapsedTime) {
    const cartesianX = Physics
      .calculateDistanceByAverageVelocity(this.internal.velocity, elapsedTime, cartesianPosition.x);

    return new Point(cartesianX, cartesianPosition.y);
  }
}

export default StraightMotion;

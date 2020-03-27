import BaseMotion from './base_motion';

/**
 * @typedef {import('../../../point').default} Point
 */
class NonCyclicMotion extends BaseMotion {
  /**
   * @returns {Promise}
   */
  start() {
    this.stop();

    const initialTime = (new Date()).getTime();
    const initialPosition = this.internal.unitTransform.position;
    this.internal.initialCartesianPosition = this.internal.coordinateConverter
      .convertScreenToCartesian(initialPosition);

    return new Promise(resolve => this.internal.timerService.start(() => {
      const elapsedTime = ((new Date()).getTime() - initialTime) / 1000;

      const currentCartesianPosition = this.calculate(elapsedTime);
      const currentPosition = this.internal.coordinateConverter
        .convertCartesianToScreen(currentCartesianPosition);

      if (this.isFinalStep(currentCartesianPosition, elapsedTime)) {
        resolve();
        this.stop();
      }

      this.internal.moveController.moveToPosition(currentPosition.x, currentPosition.y);
    }));
  }

  /**
   * @param {Point} currentCartesianPosition
   * @param {Point} elapsedTime
   * @returns {boolean}
   */
  isFinalStep(currentCartesianPosition, elapsedTime) {
    throw new Error(`isFinalStep is not implemented in '${this.constructor.name}' class`);
  }
}

export default NonCyclicMotion;

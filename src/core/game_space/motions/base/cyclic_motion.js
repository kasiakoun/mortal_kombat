import BaseMotion from './base_motion';

class CyclicMotion extends BaseMotion {
  start() {
    this.internal.timerService.stop();

    const initialTime = (new Date()).getTime();
    const initialPosition = this.internal.unitTransform.position;
    this.internal.initialCartesianPosition = this.internal.coordinateConverter
      .convertScreenToCartesian(initialPosition);

    this.internal.timerService.start(() => {
      const elapsedTime = ((new Date()).getTime() - initialTime) / 1000;

      const currentCartesianPosition = this.calculate(elapsedTime);
      const currentPosition = this.internal.coordinateConverter
        .convertCartesianToScreen(currentCartesianPosition);

      this.internal.moveController.moveToPosition(currentPosition.x, currentPosition.y);
    });
  }
}

export default CyclicMotion;

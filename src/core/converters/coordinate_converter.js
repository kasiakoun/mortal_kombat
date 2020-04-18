import Point from '../point';

class CoordinateConverter {
  /**
   * @param {number} screenWidth
   * @param {number} screenHeight
   */
  constructor(screenWidth, screenHeight) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
  }

  convertScreenToCartesianY(screenY) {
    return -screenY + this.screenHeight / 2;
  }

  convertCartesianToScreenY(cartesianY) {
    return -cartesianY + this.screenHeight / 2;
  }

  /**
   * @param {Point} screenPoint
   * @returns {Point}
   */
  convertScreenToCartesian(screenPoint) {
    const cartesianX = screenPoint.x - this.screenWidth / 2;
    const cartesianY = -screenPoint.y + this.screenHeight / 2;

    return new Point(cartesianX, cartesianY);
  }

  /**
   * @param {Point} caresianPoint
   * @returns {Point}
   */
  convertCartesianToScreen(caresianPoint) {
    const screenX = caresianPoint.x + this.screenWidth / 2;
    const screenY = -caresianPoint.y + this.screenHeight / 2;

    return new Point(screenX, screenY);
  }
}

export default CoordinateConverter;

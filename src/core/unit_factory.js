import CollisionDetector from './game_space/collision_detector';
import Units from './units/units';
import Cyrax from './units/cyrax';

/**
 * Creates units
 */
export default class UnitFactory {
  /**
   * @param collisionDetector {CollisionDetector}
   */
  constructor(collisionDetector) {
    this.collisionDetector = collisionDetector;
  }

  /**
   * @param {Units} units
   */
  createUnit(units) {
    let unit;
    switch (units) {
      case Units.cyrax:
        unit = new Cyrax();
        break;
      default:
        unit = undefined;
        break;
    }

    if (unit) {
      this.collisionDetector.units.push(unit);
    }

    return unit;
  }
}

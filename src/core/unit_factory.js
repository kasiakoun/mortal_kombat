import CollisionDetector from './game_space/collision_detector';
import Units from './units/units';
import Cyrax from './units/cyrax';
import UnitBase from './units/unit_base';

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
   * Creates a unit
   * @param {Units} units
   * @returns {UnitBase}
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
      this.collisionDetector.addUnit(unit);
    }

    return unit;
  }
}

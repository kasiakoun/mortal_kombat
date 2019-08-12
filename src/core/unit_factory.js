import Units from './units/units';
import Cyrax from './units/cyrax';

/**
 * @typedef {import('./game_space/collision_detector').default} CollisionDetector
 * @typedef {import('./units/unit_base').default} UnitBase
 */

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

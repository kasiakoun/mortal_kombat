import Units from './units/units';
import Cyrax from './units/cyrax';
import createSpriteSheet from './animation/sprite_sheet_factory';

/**
 * @typedef {import('./game_space/collision_detector').default} CollisionDetector
 * @typedef {import('./units/unit_base').default} UnitBase
 */

/**
 * Creates units
 */
export default class UnitFactory {
  /**
   * @param {CollisionDetector} collDetector
   */
  constructor(collDetector) {
    /**
     * @private
     */
    this.internal = {
      /**
       * @type {CollisionDetector}
       */
      collisionDetector: collDetector,
    };
  }

  /**
   * Creates a unit
   * @param {Units} units
   * @returns {UnitBase}
   */
  createUnit(units) {
    let unit;
    const spriteSheet = createSpriteSheet(units);
    switch (units) {
      case Units.cyrax:
        unit = new Cyrax(spriteSheet);
        break;
      default:
        unit = undefined;
        break;
    }

    if (unit) {
      this.internal.collisionDetector.addUnit(unit);
    }

    return unit;
  }
}

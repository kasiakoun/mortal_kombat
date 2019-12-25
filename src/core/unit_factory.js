import Units from './entities/units/units';
import Cyrax from './entities/units/cyrax';
import createSpriteSheet from './animation/sprite_sheet_factory';
import Transform from './transform';
import Point from './point';

/**
 * Creates units
 * @typedef {import('./game_space/collision_detector').default} CollisionDetector
 * @typedef {import('./entities/units/unit_base').default} UnitBase
 */
class UnitFactory {
  /**
   * @param {CollisionDetector} collisionDetector
   */
  constructor(collisionDetector) {
    /**
     * @private
     * @type {{
     * collisionDetector: CollisionDetector}}
     */
    this.internal = {};

    this.internal.collisionDetector = collisionDetector;
  }

  /**
   * Creates a unit
   * @param {Units} units
   * @returns {UnitBase}
   */
  createUnit(units) {
    let unit;
    const spriteSheet = createSpriteSheet(units);
    const position = new Point(0, 0);
    // todo: temprorarily solution. It will have to be get from JSON
    const transform = new Transform(position, 90, 137);

    switch (units) {
      case Units.cyrax:
        unit = new Cyrax(transform, spriteSheet);
        break;
      default:
        unit = undefined;
        break;
    }

    if (unit) {
      this.internal.collisionDetector.addEntity(unit);
    }

    return unit;
  }
}

export default UnitFactory;

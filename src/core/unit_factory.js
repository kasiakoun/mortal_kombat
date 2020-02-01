import Units from './entities/units/units';
import Cyrax from './entities/units/cyrax';
import createSpriteSheet from './animation/sprite_sheet_factory';
import Transform from './transform';
import Point from './point';

/**
 * Creates units
 * @typedef {import('./game_space/collision_detector').default} CollisionDetector
 * @typedef {import('./entities/units/unit_base').default} UnitBase
 * @typedef {import('./game_space/move_enabler').default} MoveEnabler
 */
class UnitFactory {
  /**
   * @param {CollisionDetector} collisionDetector
   * @param {MoveEnabler} moveEnabler
   */
  constructor(collisionDetector, moveEnabler) {
    /**
     * @private
     * @type {{
     * collisionDetector: CollisionDetector
     * moveEnabler: MoveEnabler}}
     */
    this.internal = {};

    this.internal.collisionDetector = collisionDetector;
    this.internal.moveEnabler = moveEnabler;
  }

  /**
   * Creates a unit
   * @param {Units} units
   * @param {Point} initialPosition
   * @returns {UnitBase}
   */
  createUnit(units, initialPosition) {
    let unit;
    const spriteSheet = createSpriteSheet(units);
    // todo: temprorarily solution. It will have to be get from JSON
    const transform = new Transform(initialPosition, 90, 137);

    switch (units) {
      case Units.cyrax:
        unit = new Cyrax(transform, spriteSheet, this.internal.moveEnabler);
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

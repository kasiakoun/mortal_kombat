/**
 * @typedef {import('../arenas/arena').default} Arena
 * @typedef {import('../entities/units/unit_base').default} UnitBase
 * @typedef {import('../point').default} Point
 */
class ArenaController {
  /**
   * @param {Arena} arena
   */
  constructor(arena) {
    /**
     * @type {{
     * arena: Arena,
     * limit: number}}
     */
    this.internal = {};

    this.internal.arena = arena;
    this.internal.limit = 15;
  }

  /**
   * @param {UnitBase} unit
   * @param {Point} position
   * @returns {boolean}
   */
  isAllowChangePosition(unit, position) {
    return this.isAllowChangePositionByX(unit, position.x);
  }

  /**
   * @param {UnitBase} unit
   * @param {number} positionX
   * @returns {boolean}
   */
  isAllowChangePositionByX(unit, positionX) {
    const leftDelta = this.internal.limit - positionX;

    const rightUnitDelta = positionX + unit.transform.width;
    const rightDelta = this.internal.arena.width - this.internal.limit - rightUnitDelta;

    return leftDelta < 0 && rightDelta > 0;
  }
}

export default ArenaController;

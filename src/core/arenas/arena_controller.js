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
   * @returns {number}
   */
  isAllowChangePosition(unit, position) {
    // debugger;
    const leftDelta = this.internal.limit - position.x;

    const rightUnitDelta = position.x + unit.transform.width;
    const rightDelta = this.internal.arena.width - this.internal.limit - rightUnitDelta;

    return leftDelta < 0 && rightDelta > 0;
  }
}

export default ArenaController;

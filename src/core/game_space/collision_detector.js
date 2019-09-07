import Observable from '../observable';

/**
 * @typedef {import('../units/unit_base').default} UnitBase
 */

/**
 * Detects collisions between units
 */
export default class CollisionDetector {
  /**
   * Fires when units collided between each other
   * @type {Observable}
   */
  get collided() {
    return this.internal.collided;
  }

  constructor() {
    /**
     * @private
     */
    this.internal = {
      /**
       * @type {UnitBase[]}
       */
      units: [],
      /**
       * @type {Observable}
       */
      collided: new Observable(),
    };
  }

  /**
   * Adds a unit to array then subscribes to him
   * @param {UnitBase} unit
   */
  addUnit(unit) {
    this.internal.units.push(unit);
    unit.positionChanged.subscribe(changedUnit => this.onDetectCollision(changedUnit));
  }

  /**
   * Handles when any unit changes his state(position, etc.)
   * @param {UnitBase} changedUnit
   */
  onDetectCollision(changedUnit) {
    if (this.internal.units.indexOf(changedUnit) < 0) return;

    this.internal.units.forEach((unit) => {
      const collisitionDetected = CollisionDetector.detectCollision(changedUnit, unit);
      if (collisitionDetected) {
        this.collided.fire(changedUnit, unit);
      }
    });
  }

  /**
   * Tries to detect collision between two objects
   * @static
   * @param {UnitBase} unit1
   * @param {UnitBase} unit2
   * @returns {boolean} It is true if collision was detected
   */
  static detectCollision(unit1, unit2) {
    if (unit1 === unit2) return false;

    const unitCoordinates1 = CollisionDetector.getUnitCoordinates(unit1);
    const unitCoordinates2 = CollisionDetector.getUnitCoordinates(unit2);

    if (unitCoordinates1.bottom < unitCoordinates2.top) return false;
    if (unitCoordinates1.top > unitCoordinates2.bottom) return false;
    if (unitCoordinates1.right < unitCoordinates2.left) return false;
    if (unitCoordinates1.left > unitCoordinates2.right) return false;

    return true;
  }

  static getUnitCoordinates(unit) {
    const left = unit.position.x;
    const right = left + unit.width;
    const top = unit.position.y;
    const bottom = top + unit.height;
    return {
      left,
      top,
      right,
      bottom,
    };
  }
}

import UnitBase from '../units/unit_base';
import Observable from '../observable';

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
      collided: new Observable()
    };
  }

  /**
   * Adds a unit to array then subscribes to him
   * @param {UnitBase} unit
   */
  addUnit(unit) {
    this.internal.units.push(unit);
    unit.positionChanged.subscribe(this.detect);
  }

  detect() {
    this.internal.units.forEach(unit => {
      // todo: it's necessary to do method that handles the collisions
    });
  }
}

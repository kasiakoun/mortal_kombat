import Observable from '../observable';
import Point from '../point';
import MoveController from '../game_space/move_controller';

/**
 * A base class for units
 * @typedef {import('../animation/sprite_sheet').default} SpriteSheet
 * @abstract
 */
export default class UnitBase {
  /**
   * Sets the current position of unit
   * @param {Point} val
   */
  set position(val) {
    this.internal.position = val;
    this.internal.positionChanged.fire(this);
  }

  /**
   * Gets the current position of unit
   * @returns {Point}
   */
  get position() {
    return this.internal.position;
  }

  /**
   * Fires when this unit changed his positioin
   * @returns {Observable}
   */
  get positionChanged() {
    return this.internal.positionChanged;
  }

  /**
   * Gets sprite sheet of this unit
   */
  get spriteSheet() {
    return this.internal.spriteSheet;
  }

  /**
   * @param {SpriteSheet} unitSpriteSheet
   */
  constructor(unitSpriteSheet, width, height) {
    /**
     * @private
     */
    this.internal = {
      /**
       * @type {SpriteSheet}
       */
      spriteSheet: unitSpriteSheet,
      /**
       * @type {Point}
       */
      position: new Point(0, 0),
      /**
       * @type {Observable}
       */
      positionChanged: new Observable(),
      /**
       * @type {MoveController}
       */
      moveController: new MoveController(this),
    };
    this.width = width;
    this.height = height;
  }
}

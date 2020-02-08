import MoveController from '../../game_space/move_controller';
import Entity from '../entity';

/**
 * A base class for units
 * @typedef {import('../../transform').default} Transform
 * @typedef {import('../../animation/sprite_sheet').default} SpriteSheet
 * @typedef {import('../../game_space/move_enabler').default} MoveEnabler
 */
class UnitBase extends Entity {
  get transform() {
    return this.internal.transform;
  }

  /**
   * Gets sprite sheet of this unit
   */
  get spriteSheet() {
    return this.internal.spriteSheet;
  }

  get moveController() {
    return this.internal.moveController;
  }

  /**
   * @param {Transform} transform
   * @param {SpriteSheet} spriteSheet
   * @param {MoveEnabler} moveEnabler
   */
  constructor(transform, spriteSheet, moveEnabler) {
    super(transform);
    /**
     * @private
     * @type {{
     * transform: Transform,
     * spriteSheet: SpriteSheet,
     * moveController: MoveController}}
     */
    this.internal = Object.assign({}, this.internal);

    this.internal.spriteSheet = spriteSheet;
    this.internal.moveController = new MoveController(this, moveEnabler);
  }
}

export default UnitBase;

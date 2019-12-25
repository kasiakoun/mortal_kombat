import MoveController from '../../game_space/move_controller';
import Entity from '../entity';

/**
 * A base class for units
 * @typedef {import('../../transform').default} Transform
 * @typedef {import('../../animation/sprite_sheet').default} SpriteSheet
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
   */
  constructor(transform, spriteSheet) {
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
    this.internal.moveController = new MoveController(this);
  }
}

export default UnitBase;

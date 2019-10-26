import Command from '../command';
import Animations from '../animation/animations';

/**
 * @typedef {import('../animation/sprite_sheet').default} SpriteSheet
 * @typedef {import('../game_space/move_controller').default} MoveController
 */

/**
  * Command that makes a unit walk backward
  */
export default class WalkBackwardCommand extends Command {
  /**
   * @param {SpriteSheet} unitSpriteSheet
   * @param {MoveController} unitMoveController
   */
  constructor(unitSpriteSheet, unitMoveController) {
    super();
    /**
     * @private
     */
    this.internal = {
      /**
       * @type {SpriteSheet}
       */
      spriteSheet: unitSpriteSheet,
      /**
       * @type {MoveController}
       */
      moveController: unitMoveController,
    };
  }

  /**
   * Invokes the command to make a unit walk backward
   */
  execute() {
    this.internal.spriteSheet.playAnimation(Animations.walkBackward);
    this.internal.moveController.moveBackward();
  }
}

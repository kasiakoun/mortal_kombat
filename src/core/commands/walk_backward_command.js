import Command from '../command';
import Animations from '../animation/animations';

/**
  * Command that makes a unit walk backward
 * @typedef {import('../animation/sprite_sheet').default} SpriteSheet
 * @typedef {import('../game_space/move_controller').default} MoveController
  */
class WalkBackwardCommand extends Command {
  /**
   * @param {SpriteSheet} spriteSheet
   * @param {MoveController} moveController
   */
  constructor(spriteSheet, moveController) {
    super();
    /**
     * @private
     * @type {{
     * spriteSheet: SpriteSheet,
     * moveController: MoveController}}
     */
    this.internal = {};

    this.internal.spriteSheet = spriteSheet;
    this.internal.moveController = moveController;
  }

  /**
   * Invokes the command to make a unit walk backward
   */
  execute() {
    this.internal.spriteSheet.playAnimation(Animations.walkBackward);
    this.internal.moveController.moveBackward();
  }
}

export default WalkBackwardCommand;

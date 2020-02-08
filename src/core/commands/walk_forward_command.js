import Command from '../command';
import Animations from '../animation/animations';

/**
  * Command that makes a unit walk forward
 * @typedef {import('../animation/sprite_sheet').default} SpriteSheet
 * @typedef {import('../game_space/move_controller').default} MoveController
  */
class WalkForwardCommand extends Command {
  /**
   * @param {SpriteSheet} unitSpriteSheet
   * @param {MoveController} unitMoveController
   */
  constructor(unitSpriteSheet, unitMoveController) {
    super();
    /**
     * @private
     * @type {{
     * spriteSheet: SpriteSheet,
     * moveController: MoveController}}
     */
    this.internal = {};

    this.internal.spriteSheet = unitSpriteSheet;
    this.internal.moveController = unitMoveController;
  }

  /**
   * Invokes the command to make a unit walk forward
   */
  execute() {
    this.internal.spriteSheet.playAnimation(Animations.walkForward);
    this.internal.moveController.moveForward();
  }
}

export default WalkForwardCommand;

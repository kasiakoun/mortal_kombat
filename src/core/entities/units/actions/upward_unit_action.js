import Animations from '../../../animation/animations';

/**
 * @typedef {import('../../../animation/sprite_sheet').default} SpriteSheet
 * @typedef {import('../../../game_space/motions/base/non_cyclic_motion').default} NonCyclicMotion
 */
class UpwardUnitAction {
  /**
   * @param {SpriteSheet} spriteSheet
   * @param {NonCyclicMotion} motion
   */
  constructor(spriteSheet, motion) {
    /**
     * @type {{
     * spriteSheet: SpriteSheet,
     * motion: NonCyclicMotion}}
     */
    this.internal = {};

    this.internal.spriteSheet = spriteSheet;
    this.internal.motion = motion;
  }

  /**
   * @returns {Promise}
   */
  execute() {
    this.internal.spriteSheet.playForwardAnimation(Animations.jumpUpward);
    return this.internal.motion.start();
  }
}

export default UpwardUnitAction;

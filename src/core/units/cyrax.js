import UnitBase from './unit_base';

/**
 * @typedef {import('../animation/sprite_sheet').default} SpriteSheet
 */
export default class Cyrax extends UnitBase {
  /**
   * @param {SpriteSheet} spriteSheet
   */
  constructor(spriteSheet) {
    super(spriteSheet, 100, 100);
  }
}

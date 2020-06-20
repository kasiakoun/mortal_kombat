import AnimationFrameStrategyBase from './animation_frame_strategy_base';

/**
 * @typedef {import('../frame').default} Frame
 */
class AnimationNextFrameStrategy extends AnimationFrameStrategyBase {
  /**
   * @returns {Frame}
   */
  getFrame() {
    let nextFrameIndex;

    const animation = this.internal.animation;
    if (animation.currentFrame) {
      nextFrameIndex = animation.frames.indexOf(animation.currentFrame) + 1;

      if (nextFrameIndex >= animation.frames.length) {
        if (animation.repeat) {
          nextFrameIndex = 0;
        } else {
          return undefined;
        }
      }
    } else {
      nextFrameIndex = 0;
    }

    return animation.frames[nextFrameIndex];
  }
}

export default AnimationNextFrameStrategy;

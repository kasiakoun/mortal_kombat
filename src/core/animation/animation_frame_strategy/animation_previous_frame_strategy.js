import AnimationFrameStrategyBase from './animation_frame_strategy_base';

/**
 * @typedef {import('../frame').default} Frame
 */
class AnimationPreviousFrameStrategy extends AnimationFrameStrategyBase {
  /**
   * @returns {Frame}
   */
  getFrame() {
    let previousFrameIndex;

    const animation = this.internal.animation;
    if (animation.currentFrame) {
      previousFrameIndex = animation.frames.indexOf(animation.currentFrame) - 1;

      if (previousFrameIndex < 0) {
        if (animation.repeat) {
          previousFrameIndex = animation.frames.length - 1;
        } else {
          return undefined;
        }
      }
    } else {
      previousFrameIndex = animation.frames.length - 1;
    }

    return animation.frames[previousFrameIndex];
  }
}

export default AnimationPreviousFrameStrategy;

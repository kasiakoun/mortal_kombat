import Observable from '../observable';
import AnimationNextFrameStrategy from './animation_frame_strategy/animation_next_frame_strategy';
import AnimationPreviousFrameStrategy from './animation_frame_strategy/animation_previous_frame_strategy';

/**
 * @typedef {import('./frame').default} Frame
 * @typedef {import('./animation_frame_strategy/animation_frame_strategy_base').default} AnimationFrameStrategyBase
 */
class Animation {
  /**
   * Frame that is shown now
   * @type {Frame}
   */
  get currentFrame() {
    return this.internal.currentFrame;
  }

  /**
   * Sets the current frame of animation
   * @param {Frame} val
   */
  set currentFrame(val) {
    this.internal.currentFrame = val;
    this.internal.currentFrameChanged.fire(this, this.currentFrame);
  }

  /**
   * Fires when the current frame was changed
   * @returns {Observable}
   */
  get currentFrameChanged() {
    return this.internal.currentFrameChanged;
  }

  /**
   * Animation name
   * @type {string}
   */
  get name() {
    return this.internal.name;
  }

  get frames() {
    return this.internal.frames;
  }

  get repeat() {
    return this.internal.repeat;
  }

  get frameRate() {
    return this.internal.frameRate;
  }

  /**
   * @param {string} name Animation name
   * @param {Frame[]} frames Frame array
   * @param {boolean} repeat Repeat animation after played
   * @param {number} rate Miliseconds between frames
   */
  constructor(name, frames, repeat, rate) {
    /**
     * @private
     * @type {{
     * frames: Frame[],
     * currentFrame: Frame,
     * repeat: boolean,
     * frameRate: number,
     * timer: NodeJS.Timeout,
     * name: string,
     * currentFrameChanged: Observable,
     * frameStrategy: AnimationFrameStrategyBase
     * }}
     */
    this.internal = {};

    this.internal.frames = frames;
    this.internal.currentFrame = undefined;
    this.internal.repeat = repeat;
    this.internal.frameRate = rate;
    this.internal.timer = undefined;
    this.internal.name = name;
    this.internal.currentFrameChanged = new Observable();
    this.internal.frameStrategy = undefined;
  }

  /**
   * @param {AnimationFrameStrategyBase} animationFrameStrategy
   * @returns {Promise}
   */
  play(animationFrameStrategy) {
    if (this.internal.timer) return new Promise();

    this.internal.currentFrame = undefined;
    this.internal.frameStrategy = animationFrameStrategy;

    return new Promise(resolve => this.runAnimationByTimer(resolve));
  }

  /**
   * @returns {Promise}
   */
  playForward() {
    return this.play(new AnimationNextFrameStrategy(this));
  }

  /**
   * @returns {Promise}
   */
  playBackward() {
    return this.play(new AnimationPreviousFrameStrategy(this));
  }

  runAnimationByTimer(resolve) {
    const frameRate = this.internal.frameStrategy.getFrameRate();

    this.internal.timer = setTimeout(() => {
      const frame = this.internal.frameStrategy.getFrame();
      clearTimeout(this.internal.timer);

      if (frame) {
        this.currentFrame = frame;
        this.runAnimationByTimer(resolve);
      } else {
        this.internal.currentFrame = frame;
        resolve();
      }
    }, frameRate);
  }

  /**
   * Stop playing this animation
   */
  stop() {
    if (!this.internal.timer) return;

    clearInterval(this.internal.timer);
    this.internal.timer = undefined;
  }
}

export default Animation;

import Observable from '../observable';

/**
 * @typedef {import('./animation').default} Animation
 * @typedef {import('./animations').default} Animations
 */

export default class SpriteSheet {
  /**
   * @returns {Observable}
   */
  get animationFrameChanged() {
    return this.internal.animationFrameChanged;
  }

  /**
   * Gets sprite url
   * @returns {string}
   */
  get image() {
    return this.internal.image;
  }

  /**
   * @param {Animation[]} animationArray Array of animation
   * @param {string} imagePath Path to image
   */
  constructor(animationArray, imagePath) {
    /**
     * @private
     */
    this.internal = {
      /**
       * @type {Animation[]}
       */
      animations: animationArray,
      /**
       * @type {string}
       */
      image: imagePath,
      /**
       * @type {Observable}
       */
      animationFrameChanged: new Observable(),
      /**
       * @type {Animation}
       */
      currentAnimation: undefined,
    };

    this.internal.animations.forEach((p) => {
      p.currentFrameChanged.subscribe((animation, frame) => {
        this.internal.animationFrameChanged.fire(animation, frame);
      });
    });
  }

  /**
   * Play animation by animation name
   * @param {Animations} animationName
   */
  playAnimation(animationName) {
    if (this.internal.currentAnimation) {
      if (this.internal.currentAnimation.name !== animationName) return;

      this.internal.currentAnimation.stop();
    }

    const animation = this.internal.animations.find(p => p.name === animationName);
    if (!animation) throw new Error(`Animation '${animationName}' did not found`);

    this.internal.currentAnimation = animation;
    animation.play();
  }
}

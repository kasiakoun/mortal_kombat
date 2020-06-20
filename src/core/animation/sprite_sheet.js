import Observable from '../observable';

/**
 * @typedef {import('./animation').default} Animation
 * @typedef {import('./animations').default} Animations
 */
class SpriteSheet {
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
     * @type {{
     * animations: Animation[],
     * image: string,
     * animationFrameChanged: Observable,
     * currentAnimation: Animation}}
     */
    this.internal = {};

    this.internal.animations = animationArray;
    this.internal.image = imagePath;
    this.internal.animationFrameChanged = new Observable();
    this.internal.currentAnimation = undefined;

    this.internal.animations.forEach((p) => {
      p.currentFrameChanged.subscribe((animation, frame) => {
        this.internal.animationFrameChanged.fire(animation, frame);
      });
    });
  }

  /**
   * @param {Animations} animationName
   * @returns {Animation}
   */
  findAnimation(animationName) {
    if (this.internal.currentAnimation) this.internal.currentAnimation.stop();

    const animation = this.internal.animations.find(p => p.name === animationName);
    if (!animation) throw new Error(`Animation '${animationName}' did not found`);

    return animation;
  }

  /**
   * @param {Animations} animationName
   * @returns {Promise}
   */
  playForwardAnimation(animationName) {
    this.internal.currentAnimation = this.findAnimation(animationName);
    return this.internal.currentAnimation.playForward();
  }

  /**
   * @param {Animations} animationName
   * @returns {Promise}
   */
  playBackwardAnimation(animationName) {
    this.internal.currentAnimation = this.findAnimation(animationName);
    return this.internal.currentAnimation.playBackward();
  }
}

export default SpriteSheet;

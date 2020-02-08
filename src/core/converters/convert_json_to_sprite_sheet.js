import Animation from '../animation/animation';
import Frame from '../animation/frame';
import Point from '../point';
import SpriteSheet from '../animation/sprite_sheet';

/**
 * Converts a JSON object to SpriteSheet
 * @typedef {import('./sprite_sheet').default} SpriteSheet
 * @param {any} jsonObject
 * @returns {SpriteSheet}
 */
function convertJsonToSpriteSheet(jsonObject) {
  const animations = jsonObject.animations.map((animation) => {
    const frames = animation.frames.map((frame) => {
      const offset = new Point(frame.x, frame.y);

      return new Frame(offset, frame.width, frame.height);
    });

    // TODO: need to change frameRate from const in future
    return new Animation(animation.name, frames, animation.repeatAnimation, 70);
  });

  return new SpriteSheet(animations, jsonObject.image);
}

export default convertJsonToSpriteSheet;

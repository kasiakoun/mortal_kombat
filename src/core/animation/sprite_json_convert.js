import Animation from './animation';
import Frame from './frame';
import Point from '../point';
import SpriteSheet from './sprite_sheet';

/**
 * @ignore
 */
function loadTextFileAjaxSync(filePath, mimeType) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', filePath, false);
  if (!mimeType) {
    if (xmlhttp.overrideMimeType) {
      xmlhttp.overrideMimeType(mimeType);
    }
  }

  xmlhttp.send();
  if (xmlhttp.status === 200) {
    return xmlhttp.responseText;
  }

  return undefined;
}

/**
 * @ignore
 */
function convertJsonObjectToSpriteSheet(jsonObject) {
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

/**
 * Convert JSON to the sprite sheet
 * @typedef {import('./sprite_sheet').default} SpriteSheet
 * @param {string} jsonPath
 * @returns {SpriteSheet}
 */
export default function spriteJsonConvert(jsonPath) {
  const mimeType = 'application/json';
  const jsonText = loadTextFileAjaxSync(jsonPath, mimeType);
  const json = JSON.parse(jsonText);
  return convertJsonObjectToSpriteSheet(json);
}

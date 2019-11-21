import loadJsonObject from '../file_helpers/load_json_object';
import convertJsonToSpriteSheet from '../converters/convert_json_to_sprite_sheet';

/**
 * Creates a sprite sheet by unit name
 * @typedef {import('./sprite_sheet').default} SpriteSheet
 * @typedef {import('../units/units').default} Units
 * @param {Units} units
 * @returns {SpriteSheet}
 */
function createSpriteSheet(units) {
  const pathToJson = `./src/assets/data/sprites/${units}.json`;
  const json = loadJsonObject(pathToJson);
  return convertJsonToSpriteSheet(json);
}

export default createSpriteSheet;

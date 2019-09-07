import spriteJsonConvert from './sprite_json_convert';

/**
 * Creates a sprite sheet by unit name
 * @typedef {import('./sprite_sheet').default} SpriteSheet
 * @typedef {import('../units/units').default} Units
 * @param {Units} units
 * @returns {SpriteSheet}
 */
export default function createSpriteSheet(units) {
  const pathToJson = `./src/assets/data/sprites/${units}.json`;
  return spriteJsonConvert(pathToJson);
}

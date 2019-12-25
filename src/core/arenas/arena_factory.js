import loadJsonObject from '../file_helpers/load_json_object';
import convertJsonToSpriteSheet from '../converters/convert_json_to_arena';

/**
 * Creates an arena by name
 * @typedef {import('./arena').default} Arena
 * @typedef {import('../arenas/arenas').default} Arenas
 * @param {Arenas} arenas
 * @returns {Arena}
 */
function createArena(arenas) {
  const pathToJson = `./src/assets/data/arenas/${arenas}.json`;
  const json = loadJsonObject(pathToJson);

  return convertJsonToSpriteSheet(json);
}

export default createArena;

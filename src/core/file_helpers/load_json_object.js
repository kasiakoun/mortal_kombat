import loadTextFile from './load_text_file';

/**
 * Loads a JSON object by path
 * @param {string} jsonPath A path to the JSON file
 * @returns {any} Returns a JSON object by path if a request is failed then returns undefined
 */
function loadJsonObject(jsonPath) {
  const mimeType = 'application/json';
  const jsonText = loadTextFile(jsonPath, mimeType);

  return JSON.parse(jsonText);
}

export default loadJsonObject;

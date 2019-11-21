/**
 * Loads a file by the path using Ajax
 * @param {string} filePath
 * @param {string} mimeType
 * @returns {string} Returns string of Ajax-request if an error is occured then returns undefined
 */
function loadTextFile(filePath, mimeType) {
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

export default loadTextFile;

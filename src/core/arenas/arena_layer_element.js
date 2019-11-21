
/**
 * @typedef {import('../point').default} Point
 */

class ArenaLayerElement {
  /**
   * @param {string} link
   * @param {number} width
   * @param {number} height
   * @param {number} zIndex
   * @param {Point} position
   */
  constructor(link, width, height, zIndex, position) {
    this.link = link;
    this.width = width;
    this.height = height;
    this.zIndex = zIndex;
    this.position = position;
  }
}

export default ArenaLayerElement;

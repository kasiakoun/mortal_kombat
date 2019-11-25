/**
 * @typedef {import('./arena_layer_element').default} ArenaLayerElement
 */

class ArenaLayer {
  /**
   * @param {ArenaLayerElement[]} elements
   * @param {number} speed
   */
  constructor(elements, speed) {
    if ((speed <= 0) && (speed >= 1)) throw new Error('Layer speed is more than 1 or less than 0');

    this.speed = speed;
    this.elements = elements;
  }
}

export default ArenaLayer;

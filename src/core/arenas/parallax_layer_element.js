/**
 * @typedef {import('./arena_layer_element').default} ArenaLayerElement
 * @typedef {import('../point').default} Point
 */
class ParallaxLayerElement {
  /**
   * @param {ArenaLayerElement} arenaLayerElement
   * @param {Point} position
   */
  constructor(arenaLayerElement, position) {
    this.position = position;
    this.arenaLayerElement = arenaLayerElement;
  }
}

export default ParallaxLayerElement;

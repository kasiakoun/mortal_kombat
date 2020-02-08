import ParallaxLayerElement from './parallax_layer_element';
import Point from '../point';

/**
 * @typedef {import('./arena').default} Arena
 * @typedef {import('./arena_layer').default} ArenaLayer
 * @typedef {import('./arena_layer_element').default} ArenaLayerElement
 */
class Parallax {
  /**
   * @param {Arena} arena
   */
  constructor(arena) {
    /**
     * @type {{
     * arena: Arena}}
     */
    this.internal = {};

    this.internal.arena = arena;
  }

  /**
   * @param {ArenaLayer} layer
   * @param {ArenaLayerElement} layerElement
   * @param {Point} offest
   * @returns {Point}
   */
  static getParallaxElementPosition(layer, layerElement, offest) {
    const x = layerElement.position.x + ((1 - layer.speed) * offest.x);
    const y = layerElement.position.y;

    return new Point(x, y);
  }

  /**
   * @param {Point} offest
   * @returns {ParallaxLayerElement[]}
   */
  move(offest) {
    const parallaxLayerElements = [];

    this.internal.arena.layers.forEach((layer) => {
      layer.elements.forEach((layerElement) => {
        const parallaxElementPosition = Parallax
          .getParallaxElementPosition(layer, layerElement, offest);
        const parallaxElement = new ParallaxLayerElement(layerElement, parallaxElementPosition);

        parallaxLayerElements.push(parallaxElement);
      });
    });

    return parallaxLayerElements;
  }
}

export default Parallax;

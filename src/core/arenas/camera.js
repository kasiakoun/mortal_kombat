import Point from '../point';
import Observable from '../observable';

/**
 * @typedef {import('./arena').default} Arena
 * @typedef {import('./arena_layer').default} ArenaLayer
 * @typedef {import('./arena_layer_element').default} ArenaLayerElement
 */

class Camera {
  /**
   * @param {Arena} arena
   */
  constructor(arena) {
    this.arena = arena;
    this.position = new Point(0, 0);
    this.positionChanged = new Observable();
  }

  /**
   * @static
   * @param {Point} position
   * @param {ArenaLayer} layer
   * @param {ArenaLayerElement} layerElement
   * @returns {Point}
   */
  static getElementLayerPosition(position, layer, layerElement) {
    const x = layerElement.position.x + (layer.speed * position.x);
    const y = layerElement.position.y + position.y;
    return new Point(x, y);
  }

  /**
   * @param {Point} position
   */
  setPosition(position) {
    this.position = position;
    this.arena.layers.forEach((layer) => {
      layer.elements.forEach((layerElement) => {
        const elementLayerPosition = Camera.getElementLayerPosition(position, layer, layerElement);
        this.positionChanged.fire(layerElement, elementLayerPosition);
      });
    });
  }
}

export default Camera;

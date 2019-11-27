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
   * @param {number} width
   * @param {number} height
   */
  constructor(arena, width, height) {
    this.arena = arena;
    this.width = width;
    this.height = height;
    this.position = new Point(0, 0);
    this.positionChanged = new Observable();
  }

  /**
   * @param {ArenaLayer} layer
   * @param {ArenaLayerElement} layerElement
   * @returns {Point}
   */
  getElementLayerPosition(layer, layerElement) {
    const x = layerElement.position.x + (layer.speed * this.position.x);
    const y = layerElement.position.y + this.position.y;

    return new Point(x, y);
  }

  /**
   * @param {Point} position
   * @returns {Point}
   */
  getClonedPosition(position) {
    const clonedPosition = Object.assign({}, position);
    const maxCameraPositionX = -(this.arena.width - this.width);

    if (maxCameraPositionX > position.x) {
      clonedPosition.x = maxCameraPositionX;
    }

    return clonedPosition;
  }

  /**
   * @param {Point} position
   */
  setPosition(position) {
    this.position = this.getClonedPosition(position);

    this.arena.layers.forEach((layer) => {
      layer.elements.forEach((layerElement) => {
        const elementLayerPosition = this.getElementLayerPosition(layer, layerElement);
        this.positionChanged.fire(layerElement, elementLayerPosition);
      });
    });
  }
}

export default Camera;

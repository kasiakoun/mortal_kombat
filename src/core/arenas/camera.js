import Point from '../point';
import Observable from '../observable';
import Parallax from './parallax';

/**
 * @typedef {import('./arena').default} Arena
 * @typedef {import('./arena_layer').default} ArenaLayer
 * @typedef {import('./arena_layer_element').default} ArenaLayerElement
 */

class Camera {
  get width() {
    return this.internal.width;
  }

  get height() {
    return this.internal.height;
  }

  get position() {
    return this.internal.position;
  }

  set position(val) {
    this.internal.position = this.getClonedPosition(val);
    const parallaxElements = this.internal.parallax.move(this.position);
    this.positionChanged.fire(this.position, parallaxElements);
  }

  get positionChanged() {
    return this.internal.positionChanged;
  }

  /**
   * @param {Arena} arena
   * @param {number} width
   * @param {number} height
   */
  constructor(arena, width, height) {
    /**
     * @type {{
     * parallax: Parallax,
     * arena: arena,
     * width: number,
     * height: number,
     * position: Point,
     * positionChanged: Observable}}
     */
    this.internal = {};

    this.internal.parallax = new Parallax(arena);
    this.internal.arena = arena;
    this.internal.width = width;
    this.internal.height = height;
    this.internal.position = new Point(0, 0);
    this.internal.positionChanged = new Observable();
  }

  /**
   * @param {Point} position
   * @returns {Point}
   */
  getClonedPosition(position) {
    const clonedPosition = Object.assign({}, position);
    const maxCameraPositionX = this.internal.arena.width - this.width;

    if (position.x > maxCameraPositionX) clonedPosition.x = maxCameraPositionX;
    if (position.x < 0) clonedPosition.x = 0;

    return clonedPosition;
  }
}

export default Camera;

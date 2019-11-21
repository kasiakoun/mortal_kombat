
/**
 * @typedef {import('./arena_layer').default} ArenaLayer
 */
class Arena {
  /**
   * @param {number} width
   * @param {number} height
   * @param {ArenaLayer[]} layers
   */
  constructor(width, height, layers) {
    this.width = width;
    this.height = height;
    this.layers = layers;
  }
}

export default Arena;

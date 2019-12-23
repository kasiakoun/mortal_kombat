/**
 * @typedef {import('../transform').default} Transform
 */
class Entity {
  get transform() {
    return this.internal.transform;
  }

  /**
   * @param {Transform} transform
   */
  constructor(transform) {
    /**
     * @private
     * @type {{
     * transform: Transform
     * }}
     */
    this.internal = {};

    this.internal.transform = transform;
  }
}

export default Entity;

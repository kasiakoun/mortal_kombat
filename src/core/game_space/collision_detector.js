import Observable from '../observable';

/**
 * Detects collisions between entities
 * @typedef {import('../entities/entity').default} Entity
 */
class CollisionDetector {
  /**
   * Fires when entities collided between each other
   * @type {Observable}
   */
  get collided() {
    return this.internal.collided;
  }

  constructor() {
    /**
     * @private
     * @type {{
     * entities: Entity[],
     * collided: Observable
     * }}
     */
    this.internal = {};

    this.internal.entities = [];
    this.internal.collided = new Observable();
  }

  /**
   * Adds an entity to array then subscribes to him
   * @param {Entity} entity
   */
  addEntity(entity) {
    this.internal.entities.push(entity);
    entity.transform.positionChanged
      .subscribe(changedEntity => this.onDetectCollision(changedEntity));
  }

  /**
   * Handles when any entity changes his state(position, etc.)
   * @param {Entity} changedEntity
   */
  onDetectCollision(changedEntity) {
    if (this.internal.entities.indexOf(changedEntity) < 0) return;

    this.internal.entities.forEach((entity) => {
      const collisitionDetected = CollisionDetector.detectCollision(changedEntity, entity);
      if (collisitionDetected) {
        this.collided.fire(changedEntity, entity);
      }
    });
  }

  /**
   * Tries to detect collision between two objects
   * @static
   * @param {Entity} entity1
   * @param {Entity} entity2
   * @returns {boolean} It is true if collision was detected
   */
  static detectCollision(entity1, entity2) {
    if (entity1 === entity2) return false;

    const entityCoordinates1 = CollisionDetector.getEntityCoordinates(entity1);
    const entityCoordinates2 = CollisionDetector.getEntityCoordinates(entity2);

    if (entityCoordinates1.bottom < entityCoordinates2.top) return false;
    if (entityCoordinates1.top > entityCoordinates2.bottom) return false;
    if (entityCoordinates1.right < entityCoordinates2.left) return false;
    if (entityCoordinates1.left > entityCoordinates2.right) return false;

    return true;
  }

  /**
   * @param {Entity} entity
   */
  static getEntityCoordinates(entity) {
    const left = entity.transform.position.x;
    const right = left + entity.transform.width;
    const top = entity.transform.position.y;
    const bottom = top + entity.transform.height;
    return {
      left,
      top,
      right,
      bottom,
    };
  }
}

export default CollisionDetector;

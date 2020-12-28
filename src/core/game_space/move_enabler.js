/**
 * @typedef {import('../arenas/camera_controller').default} CameraController
 * @typedef {import('../arenas/arena_controller').default} ArenaController
 * @typedef {import('../entities/units/unit_base').default} UnitBase
 * @typedef {import('../point').default} Point
 */
class MoveEnabler {
  /**
   * @param {CameraController} cameraController
   * @param {ArenaController} arenaController
   */
  constructor(cameraController, arenaController) {
    /**
     * @type {{
     * cameraController: CameraController,
     * arenaController: ArenaController}}
     */
    this.internal = {};

    this.internal.cameraController = cameraController;
    this.internal.arenaController = arenaController;
  }

  /**
   * @param {UnitBase} unit
   * @param {Point} position
   * @returns {boolean}
   */
  canMove(unit, position) {
    return this.internal.cameraController.isAllowChangePosition(unit, position)
      && this.internal.arenaController.isAllowChangePosition(unit, position);
  }

  /**
   * @param {UnitBase} unit
   * @param {number} positionX
   * @returns {boolean}
   */
  canMoveByX(unit, positionX) {
    return this.internal.cameraController.isAllowChangePositionByX(unit, positionX)
      && this.internal.arenaController.isAllowChangePositionByX(unit, positionX);
  }
}

export default MoveEnabler;

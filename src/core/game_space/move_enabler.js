/**
 * @typedef {import('../arenas/camera_controller').default} CameraController
 * @typedef {import('../entities/units/unit_base').default} UnitBase
 * @typedef {import('../point').default} Point
 */
class MoveEnabler {
  /**
   * @param {CameraController} cameraController
   */
  constructor(cameraController) {
    /**
     * @type {{
     * cameraController: CameraController}}
     */
    this.internal = {};

    this.internal.cameraController = cameraController;
  }

  /**
   * @param {UnitBase} unit
   * @param {Point} position
   * @returns {boolean}
   */
  canMove(unit, position) {
    return this.internal.cameraController.isAllowChangePosition(unit, position);
  }
}

export default MoveEnabler;

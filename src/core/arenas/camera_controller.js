/**
 * @typedef {import('./camera').default} Camera
 * @typedef {import('../entities/units/unit_base').default} UnitBase
 * @typedef {import('../transform').default} Transform
 * @typedef {import('../point').default} Point
 */
class CameraController {
  /**
   * @param {Camera} camera
   */
  constructor(camera) {
    /**
     * @type {{
     * limit: number,
     * camera: Camera,
     * units: UnitBase[]}}
     */
    this.internal = {};

    this.internal.limit = 20;
    this.internal.camera = camera;
    this.internal.units = [];
  }

  /**
   * @param {Point} unitPosition
   * @returns {number}
   */
  getLeftDelta(unitPosition) {
    const leftBorder = this.internal.camera.position.x
      + this.internal.limit;
    const leftUnit = unitPosition.x;

    return leftUnit - leftBorder;
  }

  /**
   * @param {Point} unitPosition
   * @param {number} unitWidth
   * @returns {number}
   */
  getRightDelta(unitPosition, unitWidth) {
    const rightBorder = this.internal.camera.position.x + this.internal.camera.width
      - this.internal.limit;
    const rightUnit = unitPosition.x + unitWidth;

    return rightUnit - rightBorder;
  }

  /**
   * @param {Transform} unitTransform
   */
  onUnitPositionChange(unitTransform) {
    const leftDelta = this.getLeftDelta(unitTransform.position);

    if (leftDelta < 0) {
      this.internal.camera.shiftPosition(leftDelta, 0);
    }

    const rightDelta = this.getRightDelta(unitTransform.position, unitTransform.width);

    if (rightDelta > 0) {
      this.internal.camera.shiftPosition(rightDelta, 0);
    }
  }

  /**
   * @param {UnitBase} unit
   * @param {Point} position
   * @returns {boolean}
   */
  isAllowChangePosition(unit, position) {
    const unitIndex = this.internal.units.indexOf(unit);
    if (unitIndex <= -1) throw new Error('Unit was not found in the units array');

    const leftDeltaUnit = this.getLeftDelta(position);
    const rightDeltaUnit = this.getRightDelta(position, unit.transform.width);

    if (leftDeltaUnit > 0 && rightDeltaUnit < 0) {
      return true;
    }

    const borderSpace = 3;
    const canChange = this.internal.units.every((p, i) => {
      if (i === unitIndex) return true;

      const rightDeltaAnotherUnit = this.getRightDelta(p.transform.position, p.transform.width);
      const leftDeltaAnotherUnit = this.getLeftDelta(p.transform.position);

      // todo: пока оставим, как есть,
      // todo: пока не столкнёмся с большой дискретностью передвижения(например телепортация)
      if (leftDeltaUnit <= 0) return rightDeltaAnotherUnit - borderSpace < 0;
      if (rightDeltaUnit >= 0) return leftDeltaAnotherUnit + borderSpace > 0;

      return false;
    });

    return canChange;
  }

  /**
   * @param {UnitBase} unit
   */
  addUnit(unit) {
    this.internal.units.push(unit);
    unit.transform.positionChanged
      .subscribe(unitTransform => this.onUnitPositionChange(unitTransform));
  }
}

export default CameraController;

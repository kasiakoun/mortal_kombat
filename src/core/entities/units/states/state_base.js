/**
 * @typedef {import('../unit_base').default} UnitBase
 * @typedef {import('../../player/input_event_type').default} InputEventType
 * @typedef {import('../../player/input_type').default} InputType
 * @typedef {import('../../player/input_state').default} InputState
 */
class StateBase {
  /**
   * @param {UnitBase} unit
   */
  constructor(unit) {
    this.unit = unit;
    this.promote();
  }

  promote() {
    throw new Error(`promote is not implemented in '${this.constructor.name}' class`);
  }

  /**
   * @param {InputEventType} inputEventType
   * @param {InputType} inputType
   * @param {InputState} inputState
   * @returns {StateBase} Returns a new state on a basis of input data otherwise returns undefined
   */
  // eslint-disable-next-line no-unused-vars
  handleInput(inputEventType, inputType, inputState) {
    throw new Error(`handleState is not implemented in '${this.constructor.name}' class`);
  }
}

export default StateBase;

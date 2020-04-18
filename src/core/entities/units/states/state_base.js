import Observable from '../../../observable';

/**
 * @typedef {import('../unit_base').default} UnitBase
 * @typedef {import('../../../player/input_event_type').default} InputEventType
 * @typedef {import('../../../player/input_type').default} InputType
 * @typedef {import('../../../player/input_state').default} InputState
 */
class StateBase {
  get stateCompleted() {
    return this.internal.stateCompleted;
  }

  /**
   * @param {UnitBase} unit
   * @param {InputState} [lastInputState]
   */
  constructor(unit, lastInputState) {
    /**
     * @type {{
     * lastInputState: InputState,
     * stateCompleted: Observable
     * }}
     */
    this.internal = {};

    this.unit = unit;
    this.internal.lastInputState = lastInputState;

    this.internal.stateCompleted = new Observable();
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
    this.internal.lastInputState = inputState;
  }
}

export default StateBase;

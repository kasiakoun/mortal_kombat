import InputState from './input_state';
import InputEventType from './input_event_type';

/**
 * @typedef {import('../entities/units/unit_base').default} UnitBase
 */
class PlayerInput {
  /**
   * @param {UnitBase} unit
   */
  constructor(unit) {
    this.currentInputState = new InputState();
    this.unit = unit;
  }

  /**
   * @param {InputEventType} inputEventType
   * @param {InputType} inputType
   */
  handleInput(inputEventType, inputType) {
    this.currentInputState.setState(inputType, inputEventType !== InputEventType.up);

    this.unit.handleInput(inputEventType, inputType, this.currentInputState);
  }
}

export default PlayerInput;

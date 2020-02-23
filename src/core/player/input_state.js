/**
 * @typedef {import('./input_type').default} InputType
 */
class InputState {
  constructor() {
    this.backward = false;
    this.upward = false;
    this.forward = false;
    this.downward = false;
    this.lowpunch = false;
    this.highpunch = false;
    this.block = false;
    this.run = false;
    this.lowkick = false;
    this.highkick = false;
  }

  /**
   * @param {InputType} inputType
   * @param {boolean} isPressedDown
   */
  setState(inputType, isPressedDown) {
    this[inputType] = isPressedDown;
  }
}

export default InputState;

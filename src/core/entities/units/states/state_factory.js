import StanceState from './stance_state';
import WalkForwardState from './walk_forward_state';
import JumpUpwardState from './jump_upward_state';
import WalkBackwardState from './walk_backward_state';

/**
 * @typedef {import('../unit_base').default} UnitBase
 * @typedef {import('../../../player/input_state').default} InputState
 * @typedef {import('./state_base').default} StateBase
 */
class StateFactory {
  /**
   * @param {UnitBase} unit
   */
  constructor(unit) {
    /**
     * @type {{
     * unit: UnitBase}}
     */
    this.internal = {};

    this.internal.unit = unit;
  }

  /**
   * @param {InputState} inputState
   * @returns {StateBase}
   */
  createState(inputState) {
    let state;

    if (inputState.forward) {
      state = new WalkForwardState(this, inputState);
    } else if (inputState.backward) {
      state = new WalkBackwardState(this, inputState);
    } else if (inputState.upward) {
      state = new JumpUpwardState(this, inputState);
    } else {
      state = new StanceState(this, inputState);
    }

    return state;
  }

  createInitialState() {
    return new StanceState(this);
  }
}

export default StateFactory;

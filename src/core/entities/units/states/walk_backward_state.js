import Animations from '../../../animation/animations';
import StateBase from './state_base';
import InputEventType from '../../../player/input_event_type';
import InputType from '../../../player/input_type';

/**
 * @typedef {import('../unit_base').default} UnitBase
 * @typedef {import('../../../player/input_state').default} InputState
 */
class WalkBackwardState extends StateBase {
  promote() {
    this.unit.spriteSheet.playForwardAnimation(Animations.walkBackward);
    this.unit.moveController.moveBackward();
  }

  /**
   * @param {InputEventType} inputEventType
   * @param {InputType} inputType
   * @param {InputState} inputState
   * @returns {StateBase}
   */
  handleInput(inputEventType, inputType, inputState) {
    let newState;
    if (inputType === InputType.backward && inputEventType === InputEventType.up) {
      newState = this.internal.stateFactory.createState(inputState);
    }

    return newState;
  }
}

export default WalkBackwardState;

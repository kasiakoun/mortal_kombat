import Animations from '../../../animation/animations';
import StateBase from './state_base';
import InputEventType from '../../../player/input_event_type';
import InputType from '../../../player/input_type';
import WalkForwardState from './walk_forward_state';
import WalkBackwardState from './walk_backward_state';

/**
 * @typedef {import('../unit_base').default} UnitBase
 * @typedef {import('../../../player/input_state').default} InputState
 */
class StanceState extends StateBase {
  promote() {
    this.unit.spriteSheet.playAnimation(Animations.stance);
    this.unit.moveController.stop();
  }

  /**
   * @param {InputEventType} inputEventType
   * @param {InputType} inputType
   * @param {InputState} inputState
   * @returns {StateBase}
   */
  handleInput(inputEventType, inputType, inputState) {
    let newState;

    switch (inputType) {
      case InputType.forward:
        if (inputEventType === InputEventType.down || inputEventType === InputEventType.press) {
          newState = new WalkForwardState(this.unit);
        }
        break;
      case InputType.backward:
        if (inputEventType === InputEventType.down || inputEventType === InputEventType.press) {
          newState = new WalkBackwardState(this.unit);
        }
        break;
      default:
        break;
    }

    return newState;
  }
}

export default StanceState;

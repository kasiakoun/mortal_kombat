import Animations from '../../../animation/animations';
import StateBase from './state_base';
import StanceState from './stance_state';
import InputEventType from '../../../player/input_event_type';
import InputType from '../../../player/input_type';
import WalkForwardState from './walk_forward_state';

/**
 * @typedef {import('../unit_base').default} UnitBase
 * @typedef {import('../../../player/input_state').default} InputState
 */
class WalkBackwardState extends StateBase {
  promote() {
    this.unit.spriteSheet.playAnimation(Animations.walkBackward);
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

    switch (inputType) {
      case InputType.backward:
        if (inputEventType === InputEventType.up) {
          if (inputState.forward) {
            newState = new WalkForwardState(this.unit);
          } else {
            newState = new StanceState(this.unit);
          }
        }
        break;
      default:
        break;
    }

    return newState;
  }
}

export default WalkBackwardState;

import Animations from '../../../animation/animations';
import StateBase from './state_base';
import InputEventType from '../../../player/input_event_type';
import InputType from '../../../player/input_type';

/**
 * @typedef {import('../unit_base').default} UnitBase
 * @typedef {import('../../../player/input_state').default} InputState
 */
class WalkForwardState extends StateBase {
  promote() {
    this.unit.spriteSheet.playForwardAnimation(Animations.walkForward);
    this.unit.moveController.moveForward();
  }

  /**
   * @param {InputEventType} inputEventType
   * @param {InputType} inputType
   * @param {InputState} inputState
   * @returns {Promise<StateBase>}
   */
  handleInput(inputEventType, inputType, inputState) {
    let newState;
    if (inputType === InputType.forward && inputEventType === InputEventType.up) {
      newState = this.internal.stateFactory.createState(inputState);
    }

    return new Promise(resolve => resolve(newState));
  }
}

export default WalkForwardState;
